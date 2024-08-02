import { useEffect } from "react";

export const useChatSupport = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "//code.jivosite.com/widget/yYBDbOl5cn";

    document.body.appendChild(script);
  }, []);
};

