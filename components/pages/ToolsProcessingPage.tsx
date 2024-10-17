import { ListRenderItem, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ThemedPage from "../ThemedPage";
import ThemedAppendableList from '../ThemedAppendableList';
import { ToolProcessing, useToolProcessingStore } from '@/stores/toolProcessingStore';
import ListItem from '../ListItem';
import { useRouter } from 'expo-router';

export default function ToolsProcessingPage() {
  const { tools, addTool, updateTool, deleteTool, getToolById } = useToolProcessingStore();
  const router = useRouter();

  const renderItem: ListRenderItem<ToolProcessing> = ({ item }) => {
    return (
      <ListItem onPress={() => router.push('/(tabs)/explore')}>

      </ListItem>
    );
  }

  return (
    <ThemedPage>
      <ThemedAppendableList
        data={tools}
        renderItem={renderItem}
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
