"""Tests of release checks: fail closed on divergent sources or stale public deployment."""
import importlib.util
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch
import json
import hashlib

HERE=Path(__file__).resolve().parents[1]

def load(name):
    spec=importlib.util.spec_from_file_location(name,HERE/(name+'.py'))
    module=importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module
preflight=load('release_preflight')
live=load('verify_live_deployment')

class Response:
    status=200
    def __init__(self,body):self.body=body.encode()
    def __enter__(self):return self
    def __exit__(self,*args):pass
    def read(self,limit):return self.body[:limit]

class ReleaseTests(unittest.TestCase):
    def test_git_blob_sha_matches_format(self):
        expected=hashlib.sha1(b'blob 6\0hello\n').hexdigest()
        self.assertEqual(preflight.git_blob_sha(b'hello\n'),expected)
    def test_preflight_detects_code_divergence(self):
        with tempfile.TemporaryDirectory() as temp:
            root=Path(temp)
            (root/'test.js').write_text('a')
            match=preflight.git_blob_sha(b'a')
            with patch.object(preflight,'EXPECTED',{'test.js':match}):
                self.assertTrue(preflight.verify(root))
                (root/'test.js').write_text('b')
                self.assertFalse(preflight.verify(root))
    def test_live_gate_rejects_stale_version(self):
        def fake(request,timeout):
            url=request.full_url
            if 'version.json' in url: return Response('{"version":"2.3.1","cache":"konpasu-offline-v231"}')
            return Response(' '.join(x for name,required in live.CHECK.items() if name in url for x in required))
        with patch.object(live.urllib.request,'urlopen',fake):self.assertFalse(live.verify())
    def test_live_gate_accepts_complete_24(self):
        def fake(request,timeout):
            url=request.full_url
            if 'version.json' in url: return Response(json.dumps({'version':'2.4.0','cache':'konpasu-offline-v240'}))
            for name,required in live.CHECK.items():
                if name in url:return Response(' '.join(required))
            raise RuntimeError('unexpected file')
        with patch.object(live.urllib.request,'urlopen',fake):self.assertTrue(live.verify())

if __name__=='__main__':unittest.main(verbosity=2)
