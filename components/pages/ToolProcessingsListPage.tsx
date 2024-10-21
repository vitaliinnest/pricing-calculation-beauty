import { ListRenderItem, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ThemedAppendableList from '../ThemedAppendableList';
import { ToolProcessing, useToolProcessingStore } from '@/stores/toolProcessingStore';
import ListItem from '../ListItem';
import { useRouter } from 'expo-router';

export default function ToolProcessingsListPage() {
  const { tools, addTool, updateTool, deleteTool, getToolById } = useToolProcessingStore();
  const router = useRouter();

  const renderItem: ListRenderItem<ToolProcessing> = ({ item }) => {
    return (
      <ListItem onPress={() => router.push(`/tool-processing/${item.id}`)}>
        <ThemedText>{JSON.stringify(item)}</ThemedText>
      </ListItem>
    );
  }

  return (
    <ThemedView>
      <ThemedAppendableList
        data={tools}
        renderItem={renderItem}
        onAddItem={() => router.push('/tool-processing/add')}
      >
        <ThemedView>
          <ThemedText>test text</ThemedText>
        </ThemedView>
      </ThemedAppendableList>
    </ThemedView>
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
