import React from "react";
import { VscGithub } from "react-icons/vsc";

const Footer: React.FC = () => {
  return (
    <div className="fixed bottom-0 flex items-center justify-between w-full px-4 py-3 lg:px-5 lg:pl-5x">
      <div className="text-slate-500 text-sm">&copy; 2023 Revenx</div>
      <div className="flex items-center">
        <a
          href="https://github.com/devinwritescode/csv-segmenter"
          target="_blank"
          className="text-slate-500 flex items-center text-sm hover:text-slate-200"
        >
          <VscGithub className="w-5 h-5 mr-2 " />
          View Source
        </a>
      </div>
    </div>
  );
};

export default Footer;
