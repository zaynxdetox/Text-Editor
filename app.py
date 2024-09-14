from flask import Flask, render_template, request, send_from_directory, jsonify
import os

app = Flask(__name__)
UPLOAD_FOLDER = 'uploads/'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/')
def index():
    return render_template('editor.html')

@app.route('/save', methods=['POST'])
def save():
    filename = request.form['filename']
    content = request.form['content']

    if not filename:
        return 'Filename is required', 400

    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    with open(filepath, 'w') as file:
        file.write(content)

    return 'File saved successfully'

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

@app.route('/search')
def search():
    query = request.args.get('query')
    results = []
    for filename in os.listdir(app.config['UPLOAD_FOLDER']):
        if query.lower() in filename.lower():
            results.append(filename)
    return jsonify({'results': results})

@app.route('/load', methods=['GET'])
def load():
    filename = request.args.get('filename')
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    if os.path.exists(filepath):
        with open(filepath, 'r') as file:
            content = file.read()
        return jsonify({'filename': filename, 'content': content})
    return 'File not found', 404

if __name__ == '__main__':
    app.run(debug=True)
