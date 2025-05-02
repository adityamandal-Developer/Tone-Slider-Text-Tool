import Header from "@/components/componentLayouts/header";
import MainComponent from "@/components/componentLayouts/mainComponent";
import Settings from "@/components/componentLayouts/settings";
import Texteditor from "@/components/componentLayouts/text-editor";
import TextArea from "@/components/ui/text-area";

export default function Home() {
  return (
    <MainComponent>
      <Header />
      <Texteditor>
        <TextArea />
        <Settings />
      </Texteditor>
    </MainComponent>
  );
}
