import { Helmet } from 'react-helmet-async';

export default function Home() {
  return (
    <div>
      <Helmet>
        <title>Faculty | C2CM</title>
      </Helmet>
      <h1 className='text-center text-4xl font-bold mb-5'>Faculty Information Viewer</h1>
      
      <div className="mx-auto mt-15 w-full max-w-3xl rounded-xl p-6 text-black border-8 border-psuBeaver">
        <form>
          <p className="text-2xl font-bold text-left pb-3 border-b mb-4">Student Information</p>
          
          <div className="boxContainer">
            <label htmlFor="key" className="whitespace-nowrap">Key:</label>
            <input
              type="text"
              id="key"
              required
              className="textFieldBox"
              placeholder="Key"
            />
          </div>

          <div className="boxContainer">
            <label htmlFor="studentId" className="whitespace-nowrap">ID:</label>
            <input
              type="text"
              id="studentId"
              required
              className="textFieldBox"
              placeholder="Student ID"
            />
          </div>

          <button type="submit" className="w-full mt-10 rounded-md bg-psuBeaver px-3 py-3 text-lg font-semibold text-white hover:bg-psuNittany transition-colors">
            Request Information
          </button>
        </form>
      </div> 
    </div>
  );
}