import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ThemedPage from "../ThemedPage";
import ThemedAppendableList from '../ThemedAppendableList';
import { useToolProcessingStore } from '@/stores/toolProcessingStore';

export default function ToolProcessingPage() {
  const { tools, addTool, updateTool, deleteTool, getToolById } = useToolProcessingStore();

  return (
    <ThemedPage title="Знос обладнання">
      <ThemedAppendableList
        data={tools}
        renderItem={() => null}
        onAddItem={() => null}
      />
    </ThemedPage>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
