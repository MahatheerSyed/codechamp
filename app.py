from flask import Flask, request, jsonify, render_template
import subprocess
import re
import os
import io
import logging
from flask_cors import CORS
import contextlib

app = Flask(__name__)
CORS(app)

# Configure logging
logging.basicConfig(level=logging.DEBUG)

def run_subprocess(command, input_text=None):
    """Run a subprocess command and return the result."""
    result = subprocess.run(command, input=input_text, capture_output=True, text=True)
    return result

def clean_file(filename):
    """Remove the specified file if it exists."""
    try:
        if os.path.exists(filename):
            os.remove(filename)
    except Exception as e:
        logging.warning(f"Failed to remove {filename}: {e}")

def execute_code(code, extension, compiler_command):
    """Write code to a file, compile it, and run it."""
    filename = f"temp_code.{extension}"
    with open(filename, 'w') as f:
        f.write(code)

    compile_process = run_subprocess(compiler_command)

    if compile_process.returncode != 0:
        return jsonify({'output': compile_process.stderr}), 500

    run_process = run_subprocess(['./temp_code']) if extension in ['c', 'cpp'] else run_subprocess(['java', filename[:-5]]) if extension == 'java' else run_subprocess(['mono', 'temp_code.exe']) if extension == 'cs' else run_subprocess(['Rscript', filename])
    
    return run_process

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/python')
def python_compiler():
    return render_template('python.html')

@app.route('/java')
def java_compiler():
    return render_template('java.html')

@app.route('/html')
def html_compiler_html():
    return render_template('html.html')

@app.route('/c')
def c_compiler():
    return render_template('C.html')
    
@app.route('/about')
def about_compiler():
    return render_template('about.html')

@app.route('/cpp')
def cpp_compiler():
    return render_template('cpp.html')

@app.route('/javascript')
def javascript_compiler():
    return render_template('javascript.html')

@app.route('/r')
def R_compiler():
    return render_template('r.html')

@app.route('/c#')
def csharp_compiler():
    return render_template('csharp.html')

@app.route('/compile-java', methods=['POST'])
def compile_java():
    data = request.get_json()
    java_code = data.get('code')

    # Extract the class name using regex
    class_name_match = re.search(r'public\s+class\s+(\w+)', java_code)
    if not class_name_match:
        return jsonify({"output": "Error: No public class found in the code"}), 400

    class_name = class_name_match.group(1)
    java_filename = f"{class_name}.java"

    with open(java_filename, "w") as file:
        file.write(java_code)

    compile_process = run_subprocess(["javac", java_filename])
    if compile_process.returncode != 0:
        return jsonify({"output": f"Compilation Error:\n{compile_process.stderr}"}), 500

    run_process = run_subprocess(["java", class_name])
    output = run_process.stdout if run_process.returncode == 0 else run_process.stderr
    return jsonify({"output": output})

@app.route('/compile-c', methods=['POST'])
def compile_c():
    data = request.get_json()
    code = data['code']
    return execute_code(code, 'c', ['gcc', 'temp_code.c', '-o', 'temp_code'])

@app.route('/compile-cpp', methods=['POST'])
def compile_cpp():
    data = request.get_json()
    cpp_code = data.get('code')
    return execute_code(cpp_code, 'cpp', ['g++', 'temp_code.cpp', '-o', 'temp_code'])

@app.route('/compile-csharp', methods=['POST'])
def compile_csharp():
    data = request.get_json()
    csharp_code = data['code']
    return execute_code(csharp_code, 'cs', ['csc', 'temp_code.cs'])

@app.route('/run-python', methods=['POST'])
def run_python():
    data = request.json
    code = data.get('code', '')
    try:
        output = io.StringIO()
        with contextlib.redirect_stdout(output):
            exec(code)
        return jsonify({'output': output.getvalue().strip()})
    except Exception as e:
        return jsonify({'output': str(e)}), 400

@app.route('/run-javascript', methods=['POST'])
def run_javascript():
    data = request.json
    code = data.get('code', '')
    try:
        output = run_subprocess(['node', '-e', code])
        if output.returncode != 0:
            return jsonify({'output': output.stderr}), 500
        return jsonify({'output': output.stdout})
    except Exception as e:
        return jsonify({'output': str(e)}), 400


@app.route('/run-r', methods=['POST'])
def run_r():
    data = request.json
    code = data.get('code', '')

    try:
        # Write the R code to a temporary file
        with open('temp_code.R', 'w') as f:
            f.write(code)

        # Specify the full path to Rscript (use raw string)
        rscript_path = r'C:\Program Files\R\R-4.4.1\bin\Rscript.exe'
        result = subprocess.run([rscript_path, 'temp_code.R'], capture_output=True, text=True)

        if result.returncode != 0:
            logging.error("R script error: %s", result.stderr)  # Log the error
            return jsonify({'output': f"Error:\n{result.stderr}"}), 500

        return jsonify({'output': result.stdout})

    except Exception as e:
        logging.error("Unexpected error: %s", str(e))  # Log any unexpected errors
        return jsonify({'output': f"Error: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True)
