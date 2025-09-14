import { Image, Text, TouchableOpacity, View } from 'react-native';

import { styles } from './styles'
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Filter } from '@/components/Filter';
import { FilterStatus } from '@/types/FilterStatus';

const FILTER_STATUS: FilterStatus[] = [FilterStatus.DONE, FilterStatus.PENDING]

export  function App() {

  return (
    <View style={styles.container}>
        <Image style={styles.logo} source={require('@/assets/logo.png')} />

        <View style={styles.form}>
          <Input placeholder='O que você precisa comprar?'/>
          <Button text='Adicionar' onPress={() => {console.log("alou")}} activeOpacity={0.8} />
        </View>

        <View style={styles.content}>
          <View style={styles.header}>
            {
              FILTER_STATUS.map((status) => 
                <Filter key={status} isActive={status === FilterStatus.DONE}  status={status}/>
              )
            }

            <TouchableOpacity style={styles.clearButton}>
              <Text style={styles.clearText}>Limpar</Text>
            </TouchableOpacity>
          </View>
        </View>
    </View>
  );
}

