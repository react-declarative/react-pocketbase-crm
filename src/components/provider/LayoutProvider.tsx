import ioc from "../../lib/ioc";
import { useEffect } from "react";
import { usePrompt } from "react-declarative";

interface ILayoutModalProviderProps {
  children: React.ReactNode;
}

export const LayoutModalProvider = ({
  children,
}: ILayoutModalProviderProps) => {

  const pickPrompt = usePrompt();

  useEffect(() => ioc.layoutService.promptOutgoing.subscribe(async (title: string) => {
    const result = await pickPrompt({ title }).toPromise();
    ioc.layoutService.promptIncoming.next(result);
  }), []);

  return <>{children}</>;
};

export default LayoutModalProvider;
