import { signIn, signOut, useSession } from "next-auth/react";
import { useState, useCallback, useRef } from "react";
import { api } from "~/utils/api";
import { IoSparklesSharp, IoSend, IoInformationCircle } from "react-icons/io5";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import ReactCodeMirror from "@uiw/react-codemirror";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { solidity } from "@replit/codemirror-lang-solidity";
import Tabs from "./Tab";

const Chatbox: React.FC = () => {
  const { data: sessionData } = useSession();

  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState(Object);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toggle, setToggle] = useState(false);

  type Tab = {
    title: any;
  };

  const tabs = [
    {
      title: "Create",
    },
    {
      title: "Settings",
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

      {activeTab?.title == "Create" ? (
        <>
          <form
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
              Give a description of a contract you want to build
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
              <div className="">
                <textarea
                  // type="text"
                  placeholder="Generate a MEV bot for Uniswap"
                  className="textarea-bordered textarea textarea-lg w-full"
                  onChange={(e) => setPrompt(e.target.value)}
                />
                <button
                  className={`btn my-4 w-full gap-2 rounded-md ${
                    isLoading == true ? "loading" : ""
                  }`}
                  type="submit"
                >
                  <p>
                    {isLoading == true
                      ? "Generating Contract"
                      : `Generate New Contract`}{" "}
                  </p>
                  {isLoading == true ? "" : <IoSend />}
                  {/* <IoSend /> */}
                </button>
                {isLoading == true ? (
                  <progress className="progress progress-info w-full"></progress>
                ) : (
                  ""
                )}
              </div>
            </div>
            {success == true ? (
              <ReactCodeMirror
                value={response.toString()}
                height="500px"
                width={"100%"}
                theme={dracula}
                // onChange={(value) => setPrompt(value)}
                extensions={[solidity]}
              />
            ) : (
              ""
            )}
          </form>
          <div className="m-2 flex flex-col items-center justify-center p-2">
            {/* <ReactMarkdown>{response && response}</ReactMarkdown> */}
          </div>
        </>
      ) : activeTab?.title == "Settings" ? (
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
                Using fewer tokens could result in less desireable results. Default is 1,000 tokens
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
      )}
    </div>
  );
};

export default Chatbox;
