import ToolsProcessingDetailsPage from "@/components/pages/ToolProcessingDetailsPage";
import {
  ToolProcessingFormValues,
  useToolProcessingStore,
} from "@/stores/toolProcessingStore";
import Toast from "react-native-toast-message";

export default function AddToolProcessing() {
  const { addTool } = useToolProcessingStore();

  const onAddTool = (formValues: ToolProcessingFormValues) => {
    Toast.show({
      type: "success",
      text1: "Hello",
      text2: "This is some something 👋",
    });
  };

  return <ToolsProcessingDetailsPage onSubmit={onAddTool} />;
}
