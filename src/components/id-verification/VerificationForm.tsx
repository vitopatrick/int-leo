import { useContext, useRef, useState } from "react";
import { toast } from "react-toastify";
import { ref, uploadBytes } from "firebase/storage";
import { db, store } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import LoadingModal from "../ui/LoadingModal";

const VerificationForm = () => {
  // ref for front and back of the document
  const frontPage = useRef<any>();
  const backPage = useRef<any>();
  const Navigate = useNavigate();

  const { user }: any = useContext(AuthContext);

  const [documentType, setDocumentType] = useState(""); // renamed from document to documentType
  const [ssn, setSSN] = useState("");
  const [submit, setSubmit] = useState(false);

  const handleUpload = async (e: any) => {
    e.preventDefault();

    setSubmit(true);

    if (!ssn) {
      setSubmit(false);
      return toast.error("Please Enter SSN", {
        position: "top-center",
        bodyClassName: "toast",
      });
    }

    if (!frontPage.current.files[0] || !backPage.current.files[0]) {
      setSubmit(false);
      return toast.error("Please select front and back images", {
        position: "top-center",
        bodyClassName: "toast",
      });
    }

    try {
      // Upload image1
      const storageRef1 = ref(
        store,
        `front-${documentType}/${frontPage.current.files[0].name}`
      );
      const uploadTask1 = uploadBytes(storageRef1, frontPage.current.files[0]);
      await uploadTask1;

      // Upload image2
      const storageRef2 = ref(
        store,
        `back-${documentType}/${backPage.current.files[0].name}`
      );
      const uploadTask2 = uploadBytes(storageRef2, backPage.current.files[0]);
      await uploadTask2;

      // update the document
      const documentRef = doc(db, "user", `${user.email}`);
      await updateDoc(documentRef, {
        ssn,
        documentType,
      });

      // Navigate to home
      Navigate("/dashboard/home");

      toast.success("Image Uploaded", {
        position: "top-center",
        bodyClassName: "toast",
      });
      setSubmit(false);
    } catch (error: any) {
      setSubmit(!submit);
      toast.error(error.code, {
        position: "bottom-center",
        bodyClassName: "toast",
      });
    }
  };

  return (
    <div className="mt-8">
      {/* container */}
      <section className="w-full md:w-[50%] mx-auto">
        {/* card */}
        <div className="bg-neutral-100/50 rounded p-3 shadow-sm">
          <form>
            {/* select */}
            <div className="flex flex-col font-sans gap-2">
              <label htmlFor="documentType" className="font-light">
                Document
              </label>
              <select
                name="file"
                id="file"
                value={documentType}
                onChange={(e: React.ChangeEvent<HTMLSelectElement> | any) =>
                  setDocumentType(e.target.value)
                }
                className="bg-slate-400/30 p-3 rounded font-light"
              >
                <option value="passport">Passport</option>
                <option value="drivers license">Drivers license</option>
                <option value="id">ID Card</option>
              </select>
            </div>
            {/* Security Number */}
            <div className="flex flex-col font-sans gap-2 mt-[2rem] mb-[1rem]">
              <label htmlFor="SSN" className="font-light">
                Social Security Number
              </label>
              <input
                type="text"
                name="ssn"
                id="ssn"
                value={ssn}
                onChange={(e: any) => setSSN(e.target.value)}
                className="bg-slate-400/30 p-3 rounded font-light"
              />
            </div>
            <p className="my-4 text-sm font-sans font-light capitalize">
              Make sure the document shows your photo, full name, date of birth
              and date of issue.
            </p>
            {/* file front*/}
            <div className="flex flex-col gap-2 font-sans my-4">
              <label htmlFor="document" className="font-light capitalize">
                upload document front
              </label>
              <input
                type="file"
                name="front-page"
                ref={frontPage}
                placeholder="front photograph"
                className="bg-slate-400/30  font-light p-3 rounded w-full"
              />
            </div>
            {/* file back */}
            <div className="flex flex-col gap-2 font-sans my-4">
              <label htmlFor="document" className="font-light capitalize">
                upload document back
              </label>
              <input
                type="file"
                name="back-page"
                ref={backPage}
                placeholder="back photograph"
                className="bg-slate-400/30  font-light p-3 rounded w-full"
              />
            </div>
            {/* submit button */}
            <button
              type="submit"
              onClick={handleUpload}
              className="p-3 w-full bg-blue-500 rounded font-sans font-normal capitalize text-blue-50"
            >
              submit document
            </button>
          </form>
        </div>
      </section>
      <LoadingModal isOpen={submit} />
    </div>
  );
};

export default VerificationForm;
