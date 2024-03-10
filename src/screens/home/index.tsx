import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";

import { styles } from "./styles";
import { Participant } from "../../components/Participant";
import { useState } from "react";

export function Home() {
  const [participants, setParticipants] = useState<string[]>([]);
  const [participantName, setParticipantName] = useState("");

  function handleParticipantAdd() {
    if (participants.includes(participantName)) {
      return Alert.alert(
        "Paritipante já existe",
        "Já existe um participante na lista com esse nome"
      );
    }

    setParticipants((prevState) => [...prevState, participantName]);
    setParticipantName("");
  }

  function handleParticipanteRemove(nome: string) {
    Alert.alert("Remover", `Remover o participante ${nome}?`, [
      {
        text: "Sim",
        onPress: () =>
          setParticipants((prevState) =>
            prevState.filter((participant) => participant !== nome)
          ),
      },
      {
        text: "Não",
        style: "cancel",
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Nome do Evento</Text>
      <Text style={styles.eventDate}>12 de dezembro de 2024.</Text>

      <View style={styles.form}>
        <TextInput
          placeholderTextColor={"#6b6b6b"}
          placeholder="nome do participante"
          style={styles.input}
          onChangeText={setParticipantName}
          value={participantName}
        />
        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Participant
            key={item}
            name={item}
            onRemove={() => handleParticipanteRemove(item)}
          />
        )}
        ListEmptyComponent={() => (
          <Text style={styles.listyEmptyText}>
            Ninguem chegou no evento ainda? Adicione participantes a sua lista
            de presenças.
          </Text>
        )}
        data={participants}
      />
    </View>
  );
}
