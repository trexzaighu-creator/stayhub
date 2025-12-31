from django.test import Client


def test_root_health():
    c = Client()
    resp = c.get('/')
    assert resp.status_code == 200
    data = resp.json()
    assert data.get('status') == 'Running' or 'message' in data


def test_api_health():
    c = Client()
    resp = c.get('/api/health')
    assert resp.status_code == 200
    assert resp.json() == {'status': 'ok'}
