import ToolsProcessingDetailsPage from "@/components/pages/ToolProcessingDetailsPage";
import {
  ToolProcessingFormValues,
  useToolProcessingStore,
} from "@/stores/toolProcessingStore";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import Toast from "react-native-toast-message";

export default function AddToolProcessing() {
  const { addTool } = useToolProcessingStore();
  const router = useRouter();
  const { t } = useTranslation("toolProcessing");

  const onAddTool = (tool: ToolProcessingFormValues) => {
    addTool(tool);
    router.replace("/(tabs)/");
    Toast.show({
      type: "success",
      text1: tool.name,
      text2: t("added"),
    });
  };

  return <ToolsProcessingDetailsPage onSubmit={onAddTool} />;
}
