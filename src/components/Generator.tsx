import { signIn, signOut, useSession } from "next-auth/react";
import { useState, useCallback, useRef } from "react";
import { api } from "~/utils/api";
import { IoSparklesSharp, IoSend, IoInformationCircle } from "react-icons/io5";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import ReactCodeMirror from "@uiw/react-codemirror";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { solidity } from "@replit/codemirror-lang-solidity";
import { langs } from "@uiw/codemirror-extensions-langs";

const Chatbox: React.FC = () => {
  const { data: sessionData } = useSession();

  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState(Object);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toggle, setToggle] = useState(false);

  const [audioSource, setAudioSource] = useState<File | undefined>(undefined);

  type Tab = {
    title: any;
  };

  const tabs = [
    {
      title: "🛝 Playground",
    },
    {
      title: "🏁 Goals",
    },
    {
      title: "⚙️ Settings",
    },
  ];

  const [activeTab, setActiveTab] = useState<Tab | undefined>(tabs[0]);

  const changeActiveTab = (tab: Tab) => {
    setActiveTab(tab);
  };

  const handleSetToggle = () => {
    setToggle(!toggle);
  };

  const [userAllowance, setUserAllowance] = useState(1000);
  const [userAlowanceInput, setUserAllowanceInput] = useState(0);

  const handleUserAllowance = () => {
    setUserAllowance(userAlowanceInput);
  };

  const setAllowanceInput = (e: number) => {
    setUserAllowanceInput(e);
  };

  const handleAudio = (event: React.FormEvent) => {
    const file = (event.target as HTMLInputElement).files
    setAudioSource(file![0])
  }

  const test = api.audit.auditContract.useMutation({
    onSuccess: (data) => {
      console.log(data);
      setResponse(data.choices[0]?.message?.content);
      setSuccess(true);
      // setPrompt("");
      setIsLoading(false);
    },
    onError: (error) => {
      alert(error.message);
      setIsLoading(false);
    },
  });

  const transcribe = api.transcribe.transcribe.useMutation({
    onSuccess: (data) => {
      console.log(data);
      setResponse(data);
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  return (
    <div className="mt-7 w-full">
      <div className="tabs tabs-boxed p-2">
        {tabs.map((tab: Tab) => (
          <a
            className={`tab ${
              activeTab?.title === tab.title ? "tab-active" : ""
            }`}
            onClick={() => changeActiveTab(tab)}
          >
            {tab.title}
          </a>
        ))}
      </div>

      {activeTab?.title == "🛝 Playground" ? (
        <>
          <form
          id="form1"
            className="w-500 rounded-md bg-base-100 p-5"
            onSubmit={(e) => {
              e.preventDefault();
              if (!prompt) {
                alert("please set a prompt");
              } else {
                test.mutate({
                  userMessage: prompt,
                });
                setIsLoading(true);
              }
            }}
          >
            <h1 className="mb-10 text-lg">
              Let me know what kind of query to run 👇
            </h1>

            <div className="justify-items w-full items-center">
              {/* <ReactCodeMirror
          value={prompt}
          height="500px"
          width={"100%"}
          theme={dracula}
          onChange={(value) => setPrompt(value)}
          extensions={[solidity]}
        /> */}
           {success == true ? (
              <ReactCodeMirror
                value={response.toString().replace("```", "")}
                height="300px"
                width={"100%"}
                theme={dracula}
                // onChange={(value) => setPrompt(value)}
                // extensions={[solidity]}
                // extensions={[langs.javascript()]}
              />
            ) : (
              ""
            )}
              <div className="">
                <textarea
                  // type="text"
                  placeholder="Select all users who have not bought an item in 3 months..."
                  className="textarea-bordered textarea textarea-lg w-full"
                  onChange={(e) => setPrompt(e.target.value)}
                />
                <button
                  className={`btn-primary btn my-4 w-full gap-2 rounded-md ${
                    isLoading == true ? "loading" : ""
                  }`}
                  type="submit"
                >
                  <p>{isLoading == true ? "Generating Query" : `Run Query`} </p>
                  {isLoading == true ? <IoSparklesSharp /> : <IoSend />}
                  {/* <IoSend /> */}
                </button>
                {isLoading == true ? (
                  <progress className="progress progress-info w-full"></progress>
                ) : (
                  ""
                )}
              </div>
            </div>
         
          </form>
          <div className="m-2 flex flex-col items-center justify-center p-2">
            {/* <ReactMarkdown>{response && response}</ReactMarkdown> */}
          </div>
        </>
      ) : activeTab?.title == "⚙️ Settings" ? (
        <div className="w-500 rounded-md bg-base-100 p-5">
          {/* <h1 className="mb-5 text-lg">Edit your settings here</h1> */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Tokens to spend</span>
            </label>
            <label className="input-group">
              <input
                type="number"
                placeholder={"" + userAllowance}
                // value={userAllowance}
                className="input-bordered input"
                onChange={(e) => setAllowanceInput(Number(e.target.value))}
              />
              <button
                className="btn-primary btn"
                type="submit"
                onClick={() => handleUserAllowance()}
              >
                <IoSparklesSharp />
              </button>
            </label>
            <label className="label">
              <span className="label-text text-xs text-primary">
                Using fewer tokens could result in less desireable results.
                Default is 1,000 tokens
              </span>
            </label>
          </div>
          <div className="align-center flex flex-row">
            <label className="mx-2 mb-4">Use Custom Prompt</label>
            <input
              type="checkbox"
              className="toggle-success toggle"
              onClick={() => handleSetToggle()}
            />
          </div>
          {toggle == true ? (
            <textarea
              // type="text"
              placeholder="Generate a contract for a 1 trillion token supply project called 'Pepe'"
              className="textarea-bordered textarea textarea-lg w-full"
              onChange={(e) => setPrompt(e.target.value)}
            />
          ) : (
            ""
          )}
        </div>
      ) : activeTab?.title == "" ? (
        <p>Audit</p>
      ) : (
        ""
        // <form
        // id="form2"
        //   className="w-500 rounded-md bg-base-100 p-5"
        //   onSubmit={(e) => {
        //     e.preventDefault();
        //     if (!audioSource) {
        //       alert("please upload some audio");
        //     } else {
        //       transcribe.mutate(
        //         audioSource,
        //       );
        //     }
        //   }}
        // >
        //   <input onChange={(e) => (
        //     handleAudio(e)
        //   )} className="input" type="file"/>
        //   {
        //     audioSource && <button type="submit" form="form2">Transcribe</button>
        //   }
        // </form>
      )}
    </div>
  );
};

export default Chatbox;
