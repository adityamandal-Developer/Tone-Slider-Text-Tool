import Header from "@/components/componentLayouts/header";
import MainComponent from "@/components/componentLayouts/mainComponent";
import Texteditor from "@/components/componentLayouts/text-editor";

export default function Home() {
  return (
    <MainComponent>
      <Header />
      <Texteditor />
    </MainComponent>
  );
}
