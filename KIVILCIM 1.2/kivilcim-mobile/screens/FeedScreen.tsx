import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, SafeAreaView, Dimensions, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { PostCard } from '../components/PostCard';
import { Plus, Search, Bell, Settings } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const COLORS = {
  bgStart: '#f2d4cc',
  bgMid1: '#e8c4b8',
  bgMid2: '#dba898',
  bgEnd: '#c98a7a',
  primary: '#dba898',
  text: '#5d4037',
};

const DUMMY_POSTS = [
  {
    id: '1',
    author: 'Elif',
    mood: '🌸 Umutlu hissediyor',
    moodType: 'umutlu' as const,
    content: 'Bugün gökyüzü çok güzeldi, sanki her şey yeniden başlayacakmış gibi...',
    time: '2 dk önce',
    likes: 12,
    comments: 4,
  },
  {
    id: '2',
    author: 'Can',
    mood: '🍃 Yorgun hissediyor',
    moodType: 'yorgun' as const,
    content: 'Uzun bir günün ardından sadece biraz huzur arıyorum. Kıvılcım yine yanımda.',
    time: '15 dk önce',
    likes: 8,
    comments: 2,
  },
  {
    id: '3',
    author: 'Zeynep',
    mood: '🌙 Yalnız hissediyor',
    moodType: 'yalniz' as const,
    content: 'Bazen kalabalığın içinde bile tek başınayken daha güçlü hissedersin. Bugün o günlerden biri.',
    time: '45 dk önce',
    likes: 24,
    comments: 7,
  }
];

export default function FeedScreen() {
  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <Text style={styles.headerTitle}>Meydan</Text>
        <TouchableOpacity style={styles.headerIcon}>
          <Bell size={24} color={COLORS.text} opacity={0.6} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statPill}>
          <Text style={styles.statLabel}>GÜN</Text>
          <Text style={styles.statValue}>12<sub>/100</sub></Text>
        </View>
        <View style={[styles.statPill, styles.warnPill]}>
          <Text style={styles.statLabel}>HAK</Text>
          <Text style={styles.statValue}>3<sub>/5</sub></Text>
        </View>
        <View style={styles.avatar}>
           <Text style={styles.avatarText}>K</Text>
           <View style={styles.badge}>
             <Text style={styles.badgeText}>67</Text>
           </View>
        </View>
      </View>
    </View>
  );

  return (
    <LinearGradient 
      colors={[COLORS.bgStart, COLORS.bgMid1, COLORS.bgMid2]} 
      style={styles.container}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          data={DUMMY_POSTS}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PostCard {...item} />}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
        
        {/* FAB */}
        <TouchableOpacity style={styles.fab}>
          <Plus size={32} color="#fff" />
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 100,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    marginBottom: 10,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '300',
    color: '#6b3a30',
    letterSpacing: 2,
    fontFamily: Platform.OS === 'ios' ? 'Cormorant Garamond' : 'serif',
  },
  headerIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statPill: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 15,
    padding: 8,
    borderWidth: 1,
    borderColor: 'rgba(180, 100, 80, 0.1)',
  },
  warnPill: {
    backgroundColor: 'rgba(255, 245, 242, 0.8)',
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '300',
    color: 'rgba(107, 58, 48, 0.5)',
    marginBottom: 2,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#6b3a30',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(201, 144, 122, 0.2)',
    borderWidth: 1.5,
    borderColor: 'rgba(201, 144, 122, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6b3a30',
  },
  badge: {
    position: 'absolute',
    bottom: -6,
    backgroundColor: 'rgba(107, 58, 48, 0.8)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#c98a7a',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
});
