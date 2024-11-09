import ToolsProcessingDetailsPage from "@/components/pages/ToolProcessingDetailsPage";
import {
  ToolProcessingFormValues,
  useToolProcessingStore,
} from "@/stores/toolProcessingStore";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import Toast from "react-native-toast-message";

export default function EditToolProcessingDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { updateTool, deleteTool, getToolById } = useToolProcessingStore();
  const tool = getToolById(id);
  const { t } = useTranslation("toolProcessing");

  if (!tool) {
    return null;
  }

  const onUpdateTool = (tool: ToolProcessingFormValues) => {
    updateTool(id, tool);
    router.replace("/(tabs)/tool-processing");
    Toast.show({
      type: "success",
      text1: tool.name,
      text2: t("updated"),
    });
  };

  const onDeleteTool = () => {
    deleteTool(id);
    router.replace("/(tabs)/tool-processing");
    Toast.show({
      type: "success",
      text1: tool.name,
      text2: t("deleted"),
    });
  };

  return (
    <ToolsProcessingDetailsPage
      toolProcessing={tool}
      onSubmit={onUpdateTool}
      onDelete={onDeleteTool}
    />
  );
}
