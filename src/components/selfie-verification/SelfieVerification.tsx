import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { ref } from "firebase/storage";
import { store } from "../../firebase";

const SelfieVerification = () => {
  // ref for front and back of document
  const frontPage = useRef<any>();
  const backPage = useRef<any>();

  // document state
  const [document, setDocument] = useState();

  // upload document to firebase
  const uploadDocumentToFireStorage = async (e: any) => {
    e.preventDefault();

    const bucketRef = ref(store);

    try {
      console.log({
        front: frontPage.current.files[0],
        back: frontPage.current.files[0],
      });
    } catch (error: any) {
      toast.error(error.code);
    }
  };

  return (
    <div className="mt-8">
      {/* container */}
      <section className="w-full md:w-[50%] mx-auto">
        {/* card */}
        <div className="bg-neutral-100/50 rounded p-3 shadow-sm">
          <form action="">
            {/* select */}
            <div className="flex flex-col font-sans gap-2">
              <label htmlFor="document" className="font-light">
                Document
              </label>
              <select
                name="file"
                id="file"
                value={document}
                onChange={(e: React.ChangeEvent<HTMLSelectElement> | any) =>
                  setDocument(e.target.value)
                }
                className="bg-slate-400/30 p-3 rounded font-light"
              >
                <option value="passport">Passport</option>
                <option value="drivers license">Drivers license</option>
                <option value="id">ID Card</option>
              </select>
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
              onClick={uploadDocumentToFireStorage}
              className="p-3 w-full bg-blue-500 rounded font-sans font-normal capitalize text-blue-50"
            >
              submit document
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default SelfieVerification;
