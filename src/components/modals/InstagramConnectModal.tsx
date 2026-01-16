import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  Animated,
  Linking,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

interface InstagramConnectModalProps {
  visible: boolean;
  onClose: () => void;
  onConnect: (username: string) => void;
}

export default function InstagramConnectModal({
  visible,
  onClose,
  onConnect,
}: InstagramConnectModalProps) {
  const [username, setUsername] = useState('');
  const slideAnim = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    if (visible) {
      setUsername('');
      slideAnim.setValue(height);
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 65,
        friction: 11,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const handleOpenInstagram = async () => {
    // Try to open Instagram app first, fallback to web
    const instagramAppUrl = 'instagram://';
    const instagramWebUrl = 'https://www.instagram.com/';

    try {
      const canOpenApp = await Linking.canOpenURL(instagramAppUrl);

      if (canOpenApp) {
        await Linking.openURL(instagramAppUrl);
      } else {
        await Linking.openURL(instagramWebUrl);
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to open Instagram. Please make sure Instagram is installed.');
    }
  };

  const handleConnect = () => {
    if (!username.trim()) {
      Alert.alert('Error', 'Please enter your Instagram username');
      return;
    }

    const cleanUsername = username.trim().replace('@', '');
    onConnect(cleanUsername);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.bottomSheet,
            {
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Connect Instagram</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton} activeOpacity={0.7}>
              <MaterialCommunityIcons name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          {/* Instagram Icon */}
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name="instagram" size={64} color="#E1306C" />
          </View>

          {/* Description */}
          <Text style={styles.description}>
            Open Instagram to find your username, then enter it below
          </Text>

          {/* Open Instagram Button */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={handleOpenInstagram}
              style={styles.openInstagramButton}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons name="instagram" size={20} color="white" style={{ marginRight: 8 }} />
              <Text style={styles.openInstagramButtonText}>Open Instagram</Text>
            </TouchableOpacity>
          </View>

          {/* Username Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.atSymbol}>@</Text>
            <TextInput
              style={styles.input}
              placeholder="username"
              placeholderTextColor="#999"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* Connect Button */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={handleConnect}
              style={styles.connectButton}
              activeOpacity={0.8}
            >
              <Text style={styles.connectButtonText}>Connect Account</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
    position: 'relative',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  closeButton: {
    position: 'absolute',
    right: 24,
    top: 24,
  },
  iconContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    marginHorizontal: 24,
    marginBottom: 16,
    paddingHorizontal: 16,
    height: 56,
  },
  atSymbol: {
    fontSize: 18,
    color: '#000',
    marginRight: 4,
    fontWeight: '500',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  buttonContainer: {
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  openInstagramButton: {
    backgroundColor: '#E1306C',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  openInstagramButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  connectButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  connectButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
