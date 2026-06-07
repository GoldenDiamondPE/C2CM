import React, { useState } from 'react';
import axios from "axios";
import { Helmet } from 'react-helmet-async';



interface UploadStatus {
  type: 'success' | 'error' | '';
  message: string;
}

export default function Home() {
  const [files, setFiles] = useState<File[]>([]);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [status, setStatus] = useState<UploadStatus>({ type: '', message: '' });
  const [loading, setLoading] = useState<boolean>(false);

  const [isOpen, setIsOpen] = useState(false);

  const data = {
    "students": [
      {
        "id": "STU10111",
        "major": "Computer Science",
        "course": "CMPSC101",
        "skills": ["JavaScript", "React", "Node.js"]
      },
      {
        "id": "BAB123",
        "major": "Accounting",
        "course": "CMPSC131",
        "skills": ["Typescript", "Java", "SQL"]
      }
    ]
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files ? Array.from(event.target.files) : [];
    
    if (selectedFiles.length > 0) {
      const names = selectedFiles.map(file => file.name);
      
      setFileNames(names);
      setFiles(selectedFiles); 
      setStatus({ type: '', message: '' });
      
      event.target.value = '';
    }
  };

  const handleUpload = () => {
    if (files.length === 0) {
      setStatus({ type: 'error', message: 'Please select a JSON file first.' });
      return;
    }

    setLoading(true);
    const reader = new FileReader();

    reader.onload = async (event: ProgressEvent<FileReader>) => {
      if (!event.target) {
        setStatus({ type: 'error', message: 'Failed to read file target.' });
        setLoading(false);
        return;
      }

      const result = event.target.result;

      if (typeof result !== 'string') {
        setStatus({ type: 'error', message: 'Invalid file format.' });
        setLoading(false);
        return;
      }

      try {
        const parsedData = JSON.parse(result);
        
        const payload = {
          students: Array.isArray(parsedData) ? parsedData : parsedData.students
        };

        // The Axios POST request
        const response = await axios.post('/api/students/append', payload, {
          headers: { 'Content-Type': 'application/json' }
        });

        const resultData = response.data;

        setStatus({ 
          type: 'success', 
          message: `${resultData.message} Added ${resultData.countAdded} students.` 
        });
        
        setFiles([]); 
        setFileNames([]);

      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          const errorMessage = err.response?.data?.error || err.message || 'Failed to upload.';
          setStatus({ type: 'error', message: errorMessage });
        } else if (err instanceof Error) {
          setStatus({ type: 'error', message: `JSON Error: ${err.message}` });
        } else {
          setStatus({ type: 'error', message: 'Invalid JSON file structure.' });
        }
      } finally {
        setLoading(false);
      }
    };

    reader.readAsText(files[0]);
  };

  return (
    
    <div>
      <Helmet>
              <title>Student and Course Fetch | C2CM</title>
      </Helmet>
      <h1 className='text-center text-4xl font-bold mb-5'>Student Info File Uploader</h1>

      <div className="mx-auto mt-15 w-full max-w-3xl rounded-xl p-6 text-black border-8 border-psuBeaver">
        <p className="text-2xl font-bold text-left pb-3 border-b mb-4">Upload File Here</p>

        <p> File must contain a "students" array where each item has an id, course, skills, major, and password.</p>

        


        
        <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-xs">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex w-full items-center justify-between p-4 text-left font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
          >
            <span>Example</span>
          </button>

          <div
            className={`grid transition-all duration-300 ease-in-out ${
              isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
            }`}
          >
            <div className="overflow-hidden">
              <div className="p-4 pt-0 text-sm text-gray-600 border-t border-gray-100">
                <pre className="font-mono text-sm bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4 rounded-lg border border-gray-200 dark:border-gray-800 overflow-x-auto">
                  <code>{JSON.stringify(data, null, 2)}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>




      
        <div className="mt-10">
          <label 
            htmlFor="json-upload" 
            className="block w-full cursor-pointer rounded-md bg-psuBeaver px-3 py-3 text-lg font-semibold text-white hover:bg-psuNittany transition-colors text-center"
          >
            Upload Your JSON File
          </label>
      
          <input 
            id="json-upload"
            type="file" 
            accept=".json" 
            multiple
            onChange={handleFileChange} 
            className="hidden" 
          />
        </div>

        <button 
          onClick={handleUpload} 
          disabled={loading}
          className="w-full mt-10 rounded-md bg-psuBeaver px-3 py-3 text-lg font-semibold text-white hover:bg-psuNittany transition-colors text-center"
        >
          {loading ? 'Processing...' : 'Upload and Append'}
        </button>

        {status.message && (
          <div style={{
            marginTop: '20px',
            padding: '10px',
            borderRadius: '4px',
            backgroundColor: status.type === 'success' ? '#D4EDDA' : '#F8D7DA',
            color: status.type === 'success' ? '#155724' : '#721C24'
          }}>
            {status.message}
          </div>
        )}

        {fileNames.length > 0 && (
          <div className="mt-4 p-4 bg-gray-50 rounded-md border border-gray-200">
            <p className="text-sm font-semibold text-gray-700 mb-2">
              Selected Files ({fileNames.length}):
            </p>
            <ul className="space-y-1 max-h-40 overflow-y-auto">
              {fileNames.map((name, index) => (
                <li key={index} className="text-xs text-gray-600 truncate bg-white p-1.5 rounded border border-gray-100">
                  {name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}