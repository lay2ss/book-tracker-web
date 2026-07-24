import { useState } from "react";
import { createCollection } from "../services/bookService";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import SimpleAlert from '../components/SimpleAlert';

const CreateCollection = () => {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const handleCreate = async () => {

    setLoading(true);

    try{
        await createCollection(name);
        queryClient.invalidateQueries({ queryKey: ["collections"] });
        navigate('/profile');
    } catch (err: any) {
        console.error(err);
        if (err.response && err.response.data) {
        const backendMessage = err.response.data.message || "Invalid request.";
        setShowAlert(true);
        setAlertMessage(backendMessage);
    } else {
        setAlertMessage("Something went wrong. Please try again later.");
        setShowAlert(true);
    }
    }  finally {
        setLoading(false);
    }     
      };

  return (
    <section className="section-wrapper">
        {showAlert && (
            <SimpleAlert 
                severity={"warning"}
                message={alertMessage} 
                onClose={() => setShowAlert(false)}
            />
        )}
        <main className="main-wrapper md:py-25">
            <div className="text-center">
                <h1 className="text-2xl font-bold">Create Collection</h1>
                <p className="opacity-70">Add a new collection to organize your saved books</p>
            </div>
            <div className="w-full flex justify-center">
                <div className="mt-5 md:w-1/2 w-full">
                    <input
                    value={name}
                    onChange={(e) => setName(e.target.value)} 
                    type="text" 
                    name="" 
                    id="name" 
                    placeholder="Enter collection name" 
                    maxLength={50} 
                    className="input-style"/>
                    <label htmlFor="name"></label>
                </div>
            </div>
          <div className="w-full border-b border-white/10 pt-5"/>
          <div className="mt-10 flex gap-2 md:justify-end">
            <button onClick={handleCreate} disabled={loading} className="addButtonActived w-2/3 transition-transform active:scale-98 md:w-60">{loading? 
                                    (<Loading/>) 
                                    : 
                                    (<p>Create</p>)}</button>
            <button onClick={() => navigate(-1)} className="addButton w-1/3 transition-transform active:scale-98 md:w-35">Cancel</button>
          </div>
        </main>
    </section>
  )
}

export default CreateCollection