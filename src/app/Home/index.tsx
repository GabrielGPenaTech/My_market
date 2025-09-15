import { Alert, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';

import { styles } from './styles'
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Filter } from '@/components/Filter';
import { FilterStatus } from '@/types/FilterStatus';
import { Item } from '@/components/Item';
import { useEffect, useState } from 'react';
import { ItemStorageType, itemsStorage } from '@/storage/itemStorage';

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE]


export  function App() {
  const [items, setItems] = useState<ItemStorageType[]>([])
  const [filter, setFilter] = useState(FilterStatus.PENDING)
  const [description, setDescription] = useState("")

  async function handleAdd() {
    if(!description.trim()) {
      return Alert.alert("O campo está vazio!")
    }

    const newItem: ItemStorageType = {
      id: Math.random().toString(36).substring(2),
      description,
      status: FilterStatus.PENDING
    }

    try {
      await itemsStorage.add(newItem)
      await itemByStatus()

      Alert.alert("Adicionado", `Adicinado ${description}`)
      
      setDescription("")
      setFilter(FilterStatus.PENDING)
    } catch (error) {
      console.log(error)
      Alert.alert("Erro ao Salvar", "Não foi possível salvar o item na lista")
    }
  }

  async function itemByStatus() {
    try {
      const items = await itemsStorage.getByStatus(filter)
      setItems(items)
      
    } catch (error) {
      console.log(error)
      Alert.alert("Erro", "Não foi possível acessar os itens")
    }
  }

  async function handleRemoveItem(id: string) {
    try {
      await itemsStorage.remove(id)
      await itemByStatus()
    } catch (error) {
      console.log(error)
      Alert.alert("Erro", "Não foi possível remover o item")
    }
  }

  async function handleClearItems() {
      Alert.alert("Limpar",  "Deseja remover todos?", [
      { text: "Não", style: "cancel"},
      { text: "Sim", onPress: onClear }
    ])

  }
  
  async function onClear() {
    try {
      await itemsStorage.clear()
      setItems([])
    } catch (error) {
      console.log(error)
      Alert.alert("Erro", "Não foi possível limpar a lista")
    }
  }

  useEffect(() => {
    itemByStatus()
  }, [filter])

  return (
    <View style={styles.container}>
        <Image style={styles.logo} source={require('@/assets/logo.png')} />

        <View style={styles.form}>
          <Input 
            placeholder='O que você precisa comprar?'
            value={description}
            onChangeText={setDescription}
          />
          <Button text='Adicionar' onPress={handleAdd} activeOpacity={0.8} />
        </View>

        <View style={styles.content}>
          <View style={styles.header}>
            {
              FILTER_STATUS.map((status) => 
                <Filter 
                  key={status} 
                  isActive={status === filter}  
                  status={status}
                  onPress={() => setFilter(status)}
              />
              )
            }

            <TouchableOpacity style={styles.clearButton} onPress={handleClearItems}>
              <Text style={styles.clearText}>Limpar</Text>
            </TouchableOpacity>
          </View>

          <FlatList 
            data={items}
            keyExtractor={value => value.id}
            renderItem={({item}) => (
              <Item 
                data={item}
                onRemove={() => handleRemoveItem(item.id)}
                onStatus={() => console.log("status")} 
              />
            )}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View  style={styles.separator}/>}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={() => <Text style={styles.empty}>Nenhum item adicionado</Text>}
          />

        </View>
    </View>
  );
}

