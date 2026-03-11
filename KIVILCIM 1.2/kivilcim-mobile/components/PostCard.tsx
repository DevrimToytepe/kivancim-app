import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Heart, MessageCircle, MoreHorizontal } from 'lucide-react-native';

interface PostCardProps {
  author: string;
  mood: string;
  moodType: 'uzgun' | 'umutlu' | 'ofkeli' | 'mutlu' | 'yalniz' | 'endiseli' | 'yorgun';
  content: string;
  time: string;
  likes: number;
  comments: number;
}

const MOOD_COLORS: Record<string, { bg: string; text: string }> = {
  uzgun: { bg: '#CCE0FF', text: '#3A5A8B' },
  umutlu: { bg: '#CCFFCC', text: '#3A6A3A' },
  ofkeli: { bg: '#FFCCCC', text: '#8B3A3A' },
  mutlu: { bg: '#FFF5CC', text: '#8B7A3A' },
  yalniz: { bg: '#E8CCFF', text: '#5A3A8B' },
  endiseli: { bg: '#FFE8CC', text: '#8B6A3A' },
  yorgun: { bg: '#E8E8F0', text: '#5A5A6A' },
};

export const PostCard: React.FC<PostCardProps> = ({ author, mood, moodType, content, time, likes, comments }) => {
  const mColor = MOOD_COLORS[moodType] || MOOD_COLORS.mutlu;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{author[0]}</Text>
          </View>
          <View>
            <Text style={styles.authorName}>{author}</Text>
            <Text style={styles.timeText}>{time}</Text>
          </View>
        </View>
        <TouchableOpacity>
          <MoreHorizontal size={20} color="#6b3a30" opacity={0.5} />
        </TouchableOpacity>
      </View>

      <View style={[styles.moodBadge, { backgroundColor: mColor.bg }]}>
        <Text style={[styles.moodText, { color: mColor.text }]}>{mood}</Text>
      </View>

      <Text style={styles.content}>{content}</Text>

      <View style={styles.footer}>
        <View style={styles.stats}>
          <TouchableOpacity style={styles.statItem}>
            <Heart size={18} color="#c98a7a" fill={likes > 0 ? "#c98a7a" : "transparent"} />
            <Text style={styles.statText}>{likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.statItem}>
            <MessageCircle size={18} color="#6b3a30" opacity={0.6} />
            <Text style={styles.statText}>{comments}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(200, 130, 110, 0.15)',
    shadowColor: '#c98a7a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(201, 144, 122, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(201, 144, 122, 0.3)',
  },
  avatarText: {
    color: '#6b3a30',
    fontWeight: '700',
    fontSize: 16,
  },
  authorName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6b3a30',
  },
  timeText: {
    fontSize: 10,
    color: 'rgba(107, 58, 48, 0.5)',
    fontWeight: '300',
  },
  moodBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    marginBottom: 10,
  },
  moodText: {
    fontSize: 11,
    fontWeight: '600',
  },
  content: {
    fontSize: 14,
    color: '#5a2e24',
    lineHeight: 20,
    fontWeight: '300',
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(180, 120, 100, 0.1)',
    paddingTop: 12,
  },
  stats: {
    flexDirection: 'row',
    gap: 20,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(107, 58, 48, 0.6)',
  },
});
