import React, { useState } from "react";
import Select from "../components/UI/Select";
import phone3d from "../assets/images/phone3d.png";
import Input from "../components/UI/Input";
import TextArea from "../components/UI/TextArea";
import Rating from "../components/UI/Rating";
import Button from "../components/UI/Button";
import BackdropModal from "../components/UI/BackdropModal";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db, storage } from "../firebase-config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import InputFile from "../components/UI/InputFile";
import { useStateContext } from "../contexts/ContextProvider";

export default function AddQuiz() {
  const { updateCheck } = useStateContext();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [filterValue, setFilterValue] = useState("");
  const [quizTitle, setQuizTitle] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [answertext, setAnswertext] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(null);
  const [answer, setAnswer] = useState("True");

  const submitHandler = async (e) => {
    e.preventDefault();
    let path = "";
    if (selectedImage) {
      const appIconRef = ref(
        storage,
        `quiz_images/${selectedImage.name}-${new Date().getTime()}`
      );
      await uploadBytes(appIconRef, selectedImage);
      path = await getDownloadURL(appIconRef);
    }
    console.log(path);
    console.log("rases")

    try {
      const res=await addDoc(collection(db, "quizes"), {
        name: quizTitle,
        paragraph: paragraph,
        ansText: answertext,
        image: path,
        category: category,
        author: author,
        comment: comment,
        rating: rating,
        answer: answer,
        date: new Date(),
      });
      console.log("rases",res)
      updateCheck();
      setShowModal(true);
    } catch (error) {
      console.log("4error",error);
    }
  };

  return (
    <div className="w-full min-h-screen sm:max-w-screen-2xl px-6 sm:px-8 xl:px-6 xl:py-8 sm:mx-auto">
      <section>
        
        <div className="my-8 sm:flex items-center justify-between w-full">
          <div className="flex items-center">
            <svg
              className="w-8 h-8 text-secondary-300"
              viewBox="0 0 34 34"
              fill="currentColor"
              onClick={()=>{
                navigate('/quiz')
              }}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M15.4418 7.08325C15.722 7.08443 15.9955 7.16866 16.2278 7.32529C16.4601 7.48192 16.6408 7.70392 16.7469 7.96321C16.8531 8.22251 16.88 8.50746 16.8242 8.78203C16.7684 9.0566 16.6324 9.30845 16.4335 9.50575L9.91683 15.9941C9.78405 16.1258 9.67866 16.2825 9.60674 16.4551C9.53481 16.6277 9.49778 16.8129 9.49778 16.9999C9.49778 17.1869 9.53481 17.3721 9.60674 17.5447C9.67866 17.7174 9.78405 17.8741 9.91683 18.0058L16.4335 24.4941C16.5663 24.6258 16.6717 24.7825 16.7436 24.9551C16.8155 25.1278 16.8525 25.3129 16.8525 25.4999C16.8525 25.687 16.8155 25.8721 16.7436 26.0448C16.6717 26.2174 16.5663 26.3741 16.4335 26.5058C16.1681 26.7696 15.809 26.9177 15.4347 26.9177C15.0605 26.9177 14.7014 26.7696 14.436 26.5058L7.9335 20.0033C7.13762 19.2064 6.69058 18.1262 6.69058 16.9999C6.69058 15.8737 7.13762 14.7935 7.93351 13.9966L14.436 7.49409C14.5684 7.36279 14.7253 7.25891 14.898 7.18841C15.0706 7.11791 15.2554 7.08218 15.4418 7.08325Z" />
              <path d="M25.3583 7.08325C25.6385 7.08443 25.912 7.16866 26.1443 7.32529C26.3767 7.48192 26.5573 7.70392 26.6634 7.96321C26.7696 8.22251 26.7965 8.50746 26.7407 8.78203C26.6849 9.0566 26.5489 9.30845 26.35 9.50575L18.8558 16.9999L26.35 24.4941C26.4828 24.6258 26.5882 24.7825 26.6601 24.9551C26.732 25.1278 26.769 25.3129 26.769 25.4999C26.769 25.687 26.732 25.8721 26.6601 26.0448C26.5882 26.2174 26.4828 26.3741 26.35 26.5058C26.0846 26.7696 25.7255 26.9177 25.3512 26.9177C24.977 26.9177 24.6179 26.7696 24.3525 26.5058L15.8525 18.0058C15.7197 17.8741 15.6143 17.7174 15.5424 17.5447C15.4705 17.3721 15.4334 17.1869 15.4334 16.9999C15.4334 16.8129 15.4705 16.6277 15.5424 16.4551C15.6143 16.2825 15.7197 16.1258 15.8525 15.9941L24.3525 7.49409C24.4849 7.36279 24.6418 7.25891 24.8145 7.18841C24.9871 7.11791 25.1719 7.08218 25.3583 7.08325Z" />
            </svg>

            <h2 className="text-xxl sm:text-2xl text-primary-500 font-medium">
              Add Quiz
            </h2>
          </div>
        </div>
      </section>
      <form onSubmit={submitHandler} className="xl:flex justify-between gap-8">
        <div className="flex-auto">
          <div className="grid grid-cols-12 gap-y-3 sm:gap-y-8">
            <div className="col-span-12 sm:col-span-5 sm:pb-8 sm:border-b sm:border-b-primary-100">
              <label className="">Title</label>
              <p className="mt-1 sm:mt-2 text-xs text-white text-opacity-50">
                Enter title
              </p>
            </div>
            <div className="col-span-12 sm:col-span-7 pb-6 sm:pb-8 border-b border-b-primary-100">
              <Input
                required
                placeholder={"Type something ..."}
                value={quizTitle}
                onChange={(e) => {
                  setQuizTitle(e.target.value);
                }}
              />
            </div>
            <div className="col-span-12 sm:col-span-5 sm:pb-8 sm:border-b sm:border-b-primary-100">
              <label className="">Paragraph</label>
              <p className="mt-2 text-xs text-white text-opacity-50">
                Enter a paragraph upto 500 characters
              </p>
            </div>
            <div className="col-span-12 sm:col-span-7 pb-6 sm:pb-8 border-b border-b-primary-100">
              <TextArea
                required
                rows={6}
                placeholder={"Type something ..."}
                value={paragraph}
                onChange={(e) => {
                  setParagraph(e.target.value);
                }}
              />
            </div>
            <div className="col-span-12 sm:col-span-5 sm:pb-8 sm:border-b sm:border-b-primary-100">
              <label className="">Answer Text</label>
              <p className="mt-2 text-xs text-white text-opacity-50">
                Enter Answer Text
              </p>
            </div>
            <div className="col-span-12 sm:col-span-7 pb-6 sm:pb-8 border-b border-b-primary-100">
              <Input
                required
                placeholder={"Type something ..."}
                value={answertext}
                onChange={(e) => {
                  setAnswertext(e.target.value);
                }}
              />
            </div>
            <div className="col-span-12 sm:col-span-5 sm:pb-8 sm:border-b sm:border-b-primary-100">
              <label className="">Image</label>
              <p className="mt-2 text-xs text-white text-opacity-50">
                Upload image of your quiz
              </p>
            </div>
            <div className="col-span-12 sm:col-span-7 pb-6 sm:pb-8 border-b border-b-primary-100">
              <InputFile
                required
                imageName={selectedImage?.name}
                onChange={async (e) => {
                  setSelectedImage(e.target.files[0]);
                }}
                placeholder={"Upload Image"}
              />
            </div>
            <div className="col-span-12 sm:col-span-5 sm:pb-8 sm:border-b sm:border-b-primary-100">
              <label className="">Author</label>
              <p className="mt-2 text-xs text-white text-opacity-50">
                Enter the author
              </p>
            </div>
            <div className="col-span-12 sm:col-span-7 pb-6 sm:pb-8 border-b border-b-primary-100">
              <Input
                required
                placeholder={"Type something ..."}
                value={author}
                onChange={(e) => {
                  setAuthor(e.target.value);
                }}
              />
            </div>
            <div className="col-span-12 sm:col-span-5 sm:pb-8 sm:border-b sm:border-b-primary-100">
              <label className="">Category</label>
              <p className="mt-2 text-xs text-white text-opacity-50">
                Choose the right category
              </p>
            </div>
            <div className="col-span-12 sm:col-span-7 pb-6 sm:pb-8 border-b border-b-primary-100">
              <Select
                alt
                required
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              >
                <option value="">Select Category</option>
                <option value="General">General</option>
                <option value="Science">Science</option>
                <option value="Maths">Maths</option>
                <option value="History">History</option>
                <option value="Geography">Geography</option>
              </Select>
            </div>
            <div className="col-span-12 sm:col-span-5 sm:pb-8 sm:border-b sm:border-b-primary-100">
              <label className="">Rating</label>
              <p className="mt-2 text-xs text-white text-opacity-50">
                Select the rating and enter comment
              </p>
            </div>
            <div className="col-span-12 sm:col-span-7 pb-6 sm:pb-8 border-b border-b-primary-100">
              <div className="px-6 py-4 mb-2 bg-primary-100 rounded w-full">
                <Rating
                  isEditable={true}
                  rating={rating}
                  setRating={setRating}
                />
              </div>
              <TextArea
                rows={6}
                placeholder={"Type something ..."}
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              />
            </div>
            <div className="col-span-12 sm:col-span-5 sm:pb-8 sm:border-b sm:border-b-primary-100">
              <label className="">Answer</label>
              <p className="mt-2 text-xs text-white text-opacity-50">
                Choose the right answer
              </p>
            </div>
            <div className="col-span-12 sm:col-span-7 pb-6 sm:pb-8 border-b border-b-primary-100">
              <Select
                alt
                required
                value={answer}
                onChange={(e) => {
                  setAnswer(e.target.value);
                }}
              >
                <option value="True">True</option>
                <option value="False">False</option>
              </Select>
            </div>
          </div>
          <div className="hidden xl:flex mt-16 mb-8 gap-8">
            <button
              type="button"
              onClick={() => navigate("/quiz")}
              className="w-full px-8 py-3 rounded bg-primary-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full px-8 py-3 rounded bg-secondary-300"
            >
              Save
            </button>
          </div>
        </div>
        
        <div className="flex xl:hidden mt-16 mb-8 gap-8">
          <button
            type="button"
            onClick={() => navigate("/quiz")}
            className="w-full px-8 py-3 rounded bg-primary-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full px-8 py-3 rounded bg-secondary-300"
          >
            Save
          </button>
        </div>
      </form>
      <BackdropModal
        title="Successfully Saved"
        show={showModal}
        onClick={() => setShowModal(false)}
      >
        <p className="mb-6 text-center text-white text-opacity-50">
          Excel data contains standard daa input templates for KPIs. Please open
          the data sheet and input weekly actuals and targets.
        </p>
        <div className="flex justify-center">
          <div className="w-2/3">
            <Button
              secondaryAlt
              fullWidth
              type={"button"}
              onClick={() => {
                setShowModal(false);
                navigate("/quiz");
              }}
            >
              Yes
            </Button>
          </div>
        </div>
      </BackdropModal>
    </div>
  );
}
