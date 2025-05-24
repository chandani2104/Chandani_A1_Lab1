import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground
} from 'react-native';

const App = () => {
  const [activeFilter, setActiveFilter] = useState(0);
  const [selectedItems, setSelectedItems] = useState({});

  const categories = ['All', 'Music', 'Podcasts', 'Audiobooks'];
  const featured = [
    'Hot Hits Canada', 'Pop Favourites', 'Hip-Hop Central', '80s Hard Rock',
    'All About Country', 'Upbeat mix', 'Daily Wellness', 'Release Radar'
  ];
  const recents = [
    'Pop mix', 'Hot Hits', 'Upbeat Mix',
    'Daily Wellness', 'Hip-Hop Central', '80s Hard Rock'
  ];
  const audiobooks = [
    { id: 1, title: 'Mastering Conversation', author: 'Helen Stone' },
    { id: 2, title: 'Control your mind', author: 'Eric Robertson' },
    { id: 3, title: 'Ikigai: The Japanese Secret', author: 'Hector Garcia' },
    { id: 4, title: 'The Power of Now', author: 'Eckhart Tolle' },
  ];

  const handleFilterSelect = (index) => {
    setActiveFilter(index);
    console.log(`Selected filter: ${categories[index]}`);
  };

  const handleItemSelect = (type, id) => {
    setSelectedItems(prev => ({
      ...prev,
      [type]: prev[type] === id ? null : id
    }));
    console.log(`Selected ${type}: ${id}`);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Top Filters */}
      <View style={styles.filterRow}>
        {categories.map((cat, i) => (
          <View
            key={i}
            style={[
              styles.filterButton,
              activeFilter === i && styles.activeFilter,
              styles.clickable
            ]}
            onStartShouldSetResponder={() => true}
            onResponderRelease={() => handleFilterSelect(i)}
          >
            <Text style={[
              styles.filterText,
              activeFilter === i && styles.activeFilterText
            ]}>
              {cat}
            </Text>
          </View>
        ))}
      </View>

      {/* Featured Section */}
      <View style={styles.grid}>
        {featured.map((item, i) => (
          <View
            key={i}
            style={[
              styles.featureBox,
              selectedItems.featured === i && styles.selectedItem,
              styles.clickable
            ]}
            onStartShouldSetResponder={() => true}
            onResponderRelease={() => handleItemSelect('featured', i)}
          >
            <Image source={require('./assets/playlist1.jpg')} style={styles.featureImage} />
            <Text style={styles.featureText}>{item}</Text>
          </View>
        ))}
      </View>

      {/* Recents Section */}
      <Text style={styles.sectionTitle}>Recents</Text>
      <View style={styles.grid}>
        {recents.map((item, i) => (
          <View
            key={i}
            style={[
              styles.recentBox,
              selectedItems.recents === i && styles.selectedItem,
              styles.clickable
            ]}
            onStartShouldSetResponder={() => true}
            onResponderRelease={() => handleItemSelect('recents', i)}
          >
            <ImageBackground source={require('./assets/playlist2.jpg')} style={styles.recentImage}>
              <Text style={styles.recentTitle}>{item}</Text>
              <Text style={styles.recentUser}>Playlist | User 1</Text>
            </ImageBackground>
          </View>
        ))}
      </View>

      {/* Audiobooks Section */}
      <Text style={styles.sectionTitle}>Audiobooks for you</Text>
      <View style={styles.audiobookGrid}>
        {audiobooks.map((book) => (
          <View
            key={book.id}
            style={[
              styles.audiobookCard,
              selectedItems.audiobooks === book.id && styles.selectedItem,
              styles.clickable
            ]}
            onStartShouldSetResponder={() => true}
            onResponderRelease={() => handleItemSelect('audiobooks', book.id)}
          >
            <Image source={require('./assets/audiobook1.jpg')} style={styles.audiobookImage} />
            <Text style={styles.premium}>Included in Premium</Text>
            <Text style={styles.bookTitle}>{book.title}</Text>
            <Text style={styles.bookAuthor}>{book.author}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#000', 
    paddingHorizontal: 12, 
    paddingTop: 50 
  },
  filterRow: { 
    flexDirection: 'row', 
    gap: 8, 
    marginBottom: 16 
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#222',
    borderRadius: 20
  },
  activeFilter: { backgroundColor: '#00ccff' },
  filterText: { color: '#fff', fontSize: 14 },
  activeFilterText: { fontWeight: 'bold' },
  clickable: {
    opacity: 1,
  },
  selectedItem: {
    borderWidth: 1,
    borderColor: '#00ccff',
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10
  },

  featureBox: {
    width: '47%',
    backgroundColor: '#111',
    marginBottom: 12,
    padding: 10,
    borderRadius: 10
  },
  featureImage: {
    width: '100%',
    height: 80,
    resizeMode: 'contain',
    marginBottom: 6
  },
  featureText: { color: '#fff', fontSize: 13 },

  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 12
  },

  recentBox: {
    width: '47%',
    backgroundColor: '#111',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 12
  },
  recentImage: {
    width: '100%',
    height: 100,
    padding: 10,
    justifyContent: 'flex-end'
  },
  recentTitle: { color: '#fff', fontWeight: 'bold' },
  recentUser: { color: '#ccc', fontSize: 11 },

  audiobookGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    marginVertical: 10
  },
  audiobookCard: {
    width: '47%',
    backgroundColor: '#111',
    borderRadius: 10,
    padding: 10,
    marginBottom: 16
  },
  audiobookImage: {
    width: '100%',
    height: 90,
    resizeMode: 'contain',
    borderRadius: 10,
    marginBottom: 8
  },
  premium: {
    color: 'limegreen',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4
  },
  bookTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13
  },
  bookAuthor: {
    color: '#aaa',
    fontSize: 11
  }
});

export default App;