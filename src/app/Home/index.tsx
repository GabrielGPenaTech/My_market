import { Image, View } from 'react-native';

import { styles } from './styles'
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';

export  function App() {

  return (
    <View style={styles.container}>
        <Image style={styles.logo} source={require('@/assets/logo.png')} />

        <View style={styles.form}>
          <Input placeholder='O que você precisa comprar?'/>
          <Button text='Adicionar' onPress={() => {console.log("alou")}} activeOpacity={0.8} />
        </View>

        <View style={styles.content}></View>
    </View>
  );
}

