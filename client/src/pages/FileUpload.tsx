import React, { useState } from 'react';
import axios from "axios";
import { Helmet } from 'react-helmet-async';

interface UploadStatus {
  type: 'success' | 'error' | '';
  message: string;
}

export default function StudentUploader() {
  const [files, setFiles] = useState<File[]>([]);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [status, setStatus] = useState<UploadStatus>({ type: '', message: '' });
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);

  // Updated template example to reflect the exact key naming conventions of your DB documents
  const dataExample = {
    "students": [
      {
        "_firstname": "Joseph",
        "_middlename": "Derulo",
        "_lastname": "Smith",
        "_studentid": "123456",
        "_major": "Computer Science",
        "_minor": "Mathematics",
        "_courses": ["MATH 140", "CMPSC 360"],
        "_additionalcourses": ["MATH 141"],
        "_skills": ["Python", "JavaScript"],
        "_additionalskills": ["Java"]
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
        
        // Extract array out smoothly whether user passes raw array or a wrapped { students: [] } object
        const targetArray = Array.isArray(parsedData) ? parsedData : parsedData.students;

        if (!targetArray || targetArray.length === 0) {
          throw new Error("No student records array found in the uploaded file.");
        }

        const payload = { students: targetArray };

        // Point to your student ingest api route
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/students/append`, payload, {
          headers: { 'Content-Type': 'application/json' }
        });

        const resultData = response.data;

        setStatus({ 
          type: 'success', 
          message: `${resultData.message || 'Success!'} Added ${resultData.countAdded || targetArray.length} students.` 
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
        <title>Student Management Uploader | C2CM</title>
      </Helmet>
      
      <h1 className='text-center text-4xl font-bold mb-5'>Student Info File Uploader</h1>

      <div className="mx-auto mt-15 w-full max-w-3xl rounded-xl p-6 text-black border-8 border-psuBeaver">
        <p className="text-2xl font-bold text-left pb-3 border-b mb-4">Upload File Here</p>
        <p className="mb-6 text-gray-700">File must contain a valid array formatting containing core attributes such as <code>_studentid</code>, <code>_firstname</code>, <code>_lastname</code>, <code>_major</code>, <code>_courses</code>, and <code>_skills</code>.</p>

        {/* Dynamic Accordion View for Data Contract Structure Reference */}
        <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-xs mb-6">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex w-full items-center justify-between p-4 text-left font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
          >
            <span>View Expected Student Schema Structure</span>
            <span>{isOpen ? '▲' : '▼'}</span>
          </button>

          <div
            className={`grid transition-all duration-300 ease-in-out ${
              isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
            }`}
          >
            <div className="overflow-hidden">
              <div className="p-4 pt-0 text-sm text-gray-600 border-t border-gray-100">
                <pre className="font-mono text-sm bg-gray-50 text-gray-800 p-4 rounded-lg border border-gray-200 overflow-x-auto">
                  <code>{JSON.stringify(dataExample, null, 2)}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Visual Triggers Utilizing Component Theme Configurations */}
        <div className="mt-10">
          <label 
            htmlFor="json-upload" 
            className="block w-full cursor-pointer rounded-md bg-psuBeaver px-3 py-3 text-lg font-semibold text-white hover:bg-psuNittany transition-colors text-center"
          >
            {fileNames.length > 0 ? 'Change Chosen File' : 'Select Student JSON File'}
          </label>
      
          <input 
            id="json-upload"
            type="file" 
            accept=".json" 
            onChange={handleFileChange} 
            className="hidden" 
          />
        </div>

        {fileNames.length > 0 && (
          <div className="mt-4 p-4 bg-gray-50 rounded-md border border-gray-200">
            <p className="text-sm font-semibold text-gray-700 mb-2">Selected File Queue:</p>
            <ul className="space-y-1">
              {fileNames.map((name, index) => (
                <li key={index} className="text-xs text-gray-600 truncate bg-white p-1.5 rounded border border-gray-100">
                  {name}
                </li>
              ))}
            </ul>
          </div>
        )}

        <button 
          onClick={handleUpload} 
          disabled={loading || files.length === 0}
          className={`w-full mt-6 rounded-md px-3 py-3 text-lg font-semibold text-white transition-colors text-center ${
            files.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-psuBeaver hover:bg-psuNittany'
          }`}
        >
          {loading ? 'Processing Array Upload...' : 'Upload and Append to Database'}
        </button>

        {status.message && (
          <div className="mt-6 p-3 rounded text-center font-medium" style={{
            backgroundColor: status.type === 'success' ? '#D4EDDA' : '#F8D7DA',
            color: status.type === 'success' ? '#155724' : '#721C24',
            border: status.type === 'success' ? '1px solid #C3E6CB' : '1px solid #F5C6CB'
          }}>
            {status.message}
          </div>
        )}
      </div>
    </div>
  );
}