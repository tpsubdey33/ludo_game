import {StyleSheet, Text, View} from 'react-native';
import React, {useMemo} from 'react';
import Cell from '../Path/Cell';

const HorizontalPath = ({cells, color}) => {


  const groupedCells = useMemo(() => {
    const groups = [];
    for (let i = 0; i < cells.length; i += 6) {
      groups.push(cells.slice(i, i + 6));
    }
    console.log('groups:', groups);
    
    return groups;
  }, [cells]);

  return (
    <View style={styles.container}>
      <View style={styles.column}>
        {groupedCells.map((group, groupIndex) => (
          <View key={groupIndex} style={styles.row}>
            {group.map((id) => (
              <Cell key={id} id={id} color={color} />
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

export default React.memo(HorizontalPath);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '40%',
    height: '100%',
  },
  column: {
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  },
  row: {
    flexDirection: 'row',
    width: '16.7%',
    height: '33.3%',
  },
});
