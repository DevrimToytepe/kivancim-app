import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform,
  ActivityIndicator,
  Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSharedValue, withSpring, useAnimatedStyle } from 'react-native-reanimated';
import { supabase } from '../lib/supabase';
import { KadapulFlower } from '../components/KadapulFlower';
import { Eye, EyeOff, User, Mail, Lock, CheckCircle } from 'lucide-react-native';

const COLORS = {
  bgStart: '#f2d4cc',
  bgMid1: '#e8c4b8',
  bgMid2: '#dba898',
  bgEnd: '#c98a7a',
  primary: '#dba898',
  text: '#5d4037',
  gray: '#9e9e9e',
  error: '#ff5252',
  success: '#4caf50'
};

export default function AuthScreen({ navigation }: any) {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // Animation progress (0-1)
  const bloomProgress = useSharedValue(0);

  // Update bloom progress based on form completion
  useEffect(() => {
    let filledFields = 0;
    const totalFields = isLogin ? 2 : 4;

    if (email.length > 5 && email.includes('@')) filledFields++;
    if (password.length >= 6) filledFields++;
    if (!isLogin) {
      if (firstName.length > 1) filledFields++;
      if (lastName.length > 1) filledFields++;
    }

    const targetProgress = totalFields > 0 ? (filledFields / totalFields) : 0;
    bloomProgress.value = withSpring(targetProgress, { damping: 15, stiffness: 60 });
  }, [email, password, firstName, lastName, isLogin]);

  const handleAuth = async () => {
    setLoading(true);
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        Alert.alert('Giriş Başarılı', 'Hoş geldiniz!');
        // navigation.navigate('MainApp');
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              first_name: firstName,
              last_name: lastName,
            }
          }
        });
        if (error) throw error;
        Alert.alert('Kayıt Başarılı', 'Lütfen e-postanızı doğrulayın.');
      }
    } catch (error: any) {
      Alert.alert('Hata', error.message || 'Bir sorun oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrength = () => {
    if (password.length === 0) return 0;
    if (password.length < 6) return 0.3;
    if (password.length < 10) return 0.6;
    return 1.0;
  };

  return (
    <LinearGradient 
      colors={[COLORS.bgStart, COLORS.bgMid1, COLORS.bgMid2, COLORS.bgEnd]} 
      style={styles.container}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          
          {/* Top: Animated Kadapul Flower */}
          <View style={styles.flowerContainer}>
            <KadapulFlower progress={bloomProgress} />
            <Text style={styles.brandTitle}>KIVILCIM</Text>
            <Text style={styles.brandSubtitle}>Işığın İçten Gelsin</Text>
          </View>

          {/* Form Area */}
          <View style={styles.formContainer}>
            {/* Tabs */}
            <View style={styles.tabContainer}>
              <TouchableOpacity 
                style={[styles.tab, isLogin && styles.activeTab]} 
                onPress={() => setIsLogin(true)}
              >
                <Text style={[styles.tabText, isLogin && styles.activeTabText]}>Giriş Yap</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.tab, !isLogin && styles.activeTab]} 
                onPress={() => setIsLogin(false)}
              >
                <Text style={[styles.tabText, !isLogin && styles.activeTabText]}>Kayıt Ol</Text>
              </TouchableOpacity>
            </View>

            {/* Inputs */}
            {!isLogin && (
              <View style={styles.row}>
                <View style={[styles.inputWrapper, { flex: 1, marginRight: 10 }]}>
                  <User size={20} color={COLORS.bgEnd} style={styles.inputIcon} />
                  <TextInput 
                    placeholder="Ad" 
                    style={styles.input} 
                    value={firstName}
                    onChangeText={setFirstName}
                    placeholderTextColor={COLORS.bgEnd}
                  />
                </View>
                <View style={[styles.inputWrapper, { flex: 1 }]}>
                  <TextInput 
                    placeholder="Soyad" 
                    style={styles.input} 
                    value={lastName}
                    onChangeText={setLastName}
                    placeholderTextColor={COLORS.bgEnd}
                  />
                </View>
              </View>
            )}

            <View style={styles.inputWrapper}>
              <Mail size={20} color={COLORS.bgEnd} style={styles.inputIcon} />
              <TextInput 
                placeholder="E-posta" 
                style={styles.input} 
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                placeholderTextColor={COLORS.bgEnd}
              />
            </View>

            <View style={styles.inputWrapper}>
              <Lock size={20} color={COLORS.bgEnd} style={styles.inputIcon} />
              <TextInput 
                placeholder="Şifre" 
                style={styles.input} 
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                placeholderTextColor={COLORS.bgEnd}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={20} color={COLORS.bgEnd} /> : <Eye size={20} color={COLORS.bgEnd} />}
              </TouchableOpacity>
            </View>

            {!isLogin && password.length > 0 && (
              <View style={styles.strengthContainer}>
                <View style={[styles.strengthBar, { width: `${getPasswordStrength() * 100}%`, backgroundColor: getPasswordStrength() > 0.6 ? COLORS.success : COLORS.bgEnd }]} />
                <Text style={styles.strengthText}>Şifre Gücü</Text>
              </View>
            )}

            {/* Action Button */}
            <TouchableOpacity 
              style={styles.actionButton} 
              onPress={handleAuth}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.actionButtonText}>
                  {isLogin ? 'Giriş Yap' : 'Hesap Oluştur'}
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.forgotPass}>
              <Text style={styles.forgotPassText}>Şifremi Unuttum</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  flowerContainer: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 20,
  },
  brandTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 4,
    marginTop: -20,
  },
  brandSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 5,
    fontStyle: 'italic',
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    marginHorizontal: 30,
    borderRadius: 30,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    backdropFilter: 'blur(10px)',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 25,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 15,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 12,
  },
  activeTab: {
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '600',
  },
  activeTabText: {
    color: COLORS.bgEnd,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 55,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: COLORS.bgMid1,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: COLORS.text,
    fontSize: 16,
  },
  strengthContainer: {
    marginBottom: 15,
    paddingLeft: 5,
  },
  strengthBar: {
    height: 4,
    borderRadius: 2,
    marginBottom: 4,
  },
  strengthText: {
    fontSize: 10,
    color: '#fff',
    opacity: 0.8,
  },
  actionButton: {
    backgroundColor: COLORS.bgEnd,
    height: 55,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    shadowColor: COLORS.bgEnd,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPass: {
    alignItems: 'center',
    marginTop: 20,
  },
  forgotPassText: {
    color: '#fff',
    fontSize: 14,
    textDecorationLine: 'underline',
    opacity: 0.9,
  },
});
