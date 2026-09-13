"use client";

import { useState, ChangeEvent, FormEvent } from "react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  whatsapp: string;
  service: string;
  date: string;
  message: string;
}

export default function ContactModal({
  isOpen,
  onClose,
}: ContactModalProps) {

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    whatsapp: "",
    service: "",
    date: "",
    message: "",
  });


  if (!isOpen) return null;



  const handleChange = (
    e: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };



  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    console.log(formData);

    onClose();

  };



  return (

    <div
      className="
      fixed
      inset-0
      z-[999]
      flex
      items-center
      justify-center
      bg-black/40
      backdrop-blur-sm
      px-4
      py-4
      "
      onClick={onClose}
    >


      <div
        className="
        relative
        z-[1000]
        w-full
        max-w-xl
        max-h-[92vh]
        overflow-y-auto
        rounded-[28px]
        bg-[#f8f4ed]
        p-5
        md:p-8
        shadow-2xl
        "
        onClick={(e)=>e.stopPropagation()}
      >



        {/* CLOSE */}

        <button
          type="button"
          onClick={onClose}
          className="
          absolute
          right-4
          top-3
          z-[2000]
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-full
          text-3xl
          leading-none
          text-[#241510]
          hover:bg-black/5
          cursor-pointer
          "
        >
          ×
        </button>




        {/* HEADER */}


        <div className="mb-4">


          <p
            className="
            text-[11px]
            font-semibold
            tracking-[4px]
            text-[#75645a]
            "
          >
            GET IN TOUCH
          </p>



          <h2
            className="
            mt-2
            font-serif
            text-xl
            md:text-3xl
            leading-tight
            text-[#241510]
            "
          >
            Start a project
            <br/>
            that holds its own.
          </h2>



          <p
            className="
            mt-3
            text-sm
            text-[#71645e]
            "
          >
            Tell us about your idea and we will get back to you.
          </p>


        </div>





        <form
          onSubmit={handleSubmit}
          className="space-y-3"
        >



          <div
            className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-3
            "
          >



            {/* NAME */}

            <div>

              <label className="block mb-1 text-sm font-medium text-[#241510]">
                Name
              </label>


              <input
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className="
                w-full
                rounded-xl
                border
                border-[#ddd2c8]
                bg-white
                px-4
                py-2
                outline-none
                placeholder:text-[#9b8d84]
                focus:border-[#005b4f]
                "
              />

            </div>





            {/* EMAIL */}

            <div>

              <label className="block mb-1 text-sm font-medium text-[#241510]">
                Email
              </label>


              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="
                w-full
                rounded-xl
                border
                border-[#ddd2c8]
                bg-white
                px-4
                py-2
                outline-none
                placeholder:text-[#9b8d84]
                focus:border-[#005b4f]
                "
              />

            </div>






            {/* WHATSAPP */}

            <div>

              <label className="block mb-1 text-sm font-medium text-[#241510]">
                WhatsApp Number
              </label>


              <input
                name="whatsapp"
                placeholder="Enter WhatsApp number"
                value={formData.whatsapp}
                onChange={handleChange}
                className="
                w-full
                rounded-xl
                border
                border-[#ddd2c8]
                bg-white
                px-4
                py-2
                outline-none
                placeholder:text-[#9b8d84]
                focus:border-[#005b4f]
                "
              />

            </div>






            {/* SERVICE */}

            <div>

              <label className="block mb-1 text-sm font-medium text-[#241510]">
                Service
              </label>


              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="
                w-full
                rounded-xl
                border
                border-[#ddd2c8]
                bg-white
                px-4
                py-2
                outline-none
                text-[#9b8d84]
                "
              >

                <option value="">
                  Select Service
                </option>

                <option value="web">
                  Website Design
                </option>

                <option value="mobile">
                  Mobile App
                </option>

                <option value="uiux">
                  UI/UX Design
                </option>

                <option value="ai">
                  AI Automation
                </option>


              </select>

            </div>






            {/* DATE */}

            <div className="md:col-span-2">


              <label className="block mb-1 text-sm font-medium text-[#241510]">
                Preferred Date & Time
              </label>


              <input
                type="datetime-local"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="
                w-full
                rounded-xl
                border
                border-[#ddd2c8]
                bg-white
                px-4
                py-2
                outline-none
                text-[#9b8d84]
                "
              />


            </div>



          </div>







          {/* MESSAGE */}


          <div>


            <label className="block mb-1 text-sm font-medium text-[#241510]">
              Message
            </label>


            <textarea

              name="message"

              rows={2}

              placeholder="Tell us about your project"

              value={formData.message}

              onChange={handleChange}

              className="
              w-full
              rounded-xl
              border
              border-[#ddd2c8]
              bg-white
              px-4
              py-2
              resize-none
              outline-none
              placeholder:text-[#9b8d84]
              focus:border-[#005b4f]
              "

            />


          </div>







          {/* BUTTON */}


          <button

            type="submit"

            className="
            w-full
            rounded-full
            bg-[#005b4f]
            py-3
            text-white
            text-base
            transition
            hover:bg-[#003d35]
            cursor-pointer
            "

          >

            Send Request →

          </button>



        </form>


      </div>


    </div>

  );
}