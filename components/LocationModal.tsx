import {
  View,
  Text,
  Modal,
  Image,
  TouchableOpacity,
  Platform,
  Linking,
  Alert,
  StyleSheet,
  Dimensions,
} from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import CustomButton from "./CustomButton";
import { icons } from "@/constants";
import { ArrowRight } from "lucide-react-native";

type LocationModalProps = {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
};

const { height } = Dimensions.get("window");

const LocationModal = ({ isVisible, setIsVisible }: LocationModalProps) => {
  const closeModal = () => setIsVisible(false);

  const openAppSettings = () => {
    Linking.openSettings().catch(() => {
      Alert.alert("Error", "Unable to open settings.");
    });
  };

  const openLocationSettings = () => {
    if (Platform.OS === "android") {
      Linking.openURL("android.settings.LOCATION_SOURCE_SETTINGS").catch(() => {
        Alert.alert("Error", "Unable to open location settings.");
      });
    } else {
      openAppSettings();
    }
  };

  return (
    <Modal visible={isVisible} transparent onRequestClose={closeModal}>
      <BlurView intensity={60} tint="dark" style={StyleSheet.absoluteFill} />
      <View style={styles.modalContent}>
        <View style={styles.dragHandle} />
        <Image source={icons.mapSearch} style={styles.icon} resizeMode="contain" />
        <Text style={styles.title}>Enable Location</Text>
        <Text style={styles.description}>
          We need your location to show activities and content near you.
        </Text>
        <CustomButton
          title="Open Settings"
          handlePress={openLocationSettings}
          containerStyles="w-fit px-10 py-3"
          icon={<ArrowRight color="#fff" size={16} />}
        />
        <TouchableOpacity onPress={closeModal} style={{ marginTop: 10 }}>
          <Text style={styles.laterText}>Remind me later</Text>
        </TouchableOpacity>
        <View style={styles.privacyNote}>
          <Image source={icons.customloc} style={styles.privacyIcon} resizeMode="contain" />
          <View>
            <Text style={styles.privacyText}>OnWatch does not track your location.</Text>
            <Text style={styles.privacyText}>You can always cancel permission later.</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LocationModal;

const styles = StyleSheet.create({
  modalContent: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    alignItems: "center",
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: "#ccc",
    borderRadius: 2,
    marginBottom: 12,
  },
  icon: {
    width: 72,
    height: 72,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#4B5563",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 22,
  },
  laterText: {
    color: "#2563EB",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  privacyNote: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 20,
    gap: 8,
  },
  privacyIcon: {
    width: 12,
    height: 16,
    marginTop: 3,
  },
  privacyText: {
    fontSize: 13,
    color: "#6B7280",
    lineHeight: 18,
  },
});
