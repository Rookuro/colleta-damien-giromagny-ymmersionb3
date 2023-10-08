from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse, parse_qs
import json

class RequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        parsed_url = urlparse(self.path)
        query_params = parse_qs(parsed_url.query)
        
        if parsed_url.path == '/api/user-id':
            if 'userId' in query_params:
                user_id = query_params['userId'][0]
                response = json.dumps({'message': 'ID de l\'utilisateur reçu avec succès'})
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(response.encode())
            else:
                self.send_response(400)
                self.end_headers()
        else:
            self.send_response(404)
            self.end_headers()

def run_server():
    server_address = ('', 8000)
    httpd = HTTPServer(server_address, RequestHandler)
    print('Serveur Python en cours d\'exécution sur le port 8000...')
    httpd.serve_forever()

if __name__ == '__main__':
    run_server()
