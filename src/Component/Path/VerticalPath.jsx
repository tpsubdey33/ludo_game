import {StyleSheet, Text, View} from 'react-native';
import React, {useMemo} from 'react';
import Cell from './Cell';

const VerticalPath = ({cells, color}) => {
  console.log('cells:', cells);

  const groupedCells = useMemo(() => {
    const groups = [];
    for (let i = 0; i < cells.length; i += 3) {
      groups.push(cells.slice(i, i + 3));
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

export default React.memo(VerticalPath);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '20%',
    height: '100%',
  },
  column: {
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  },
  row: {
    flexDirection: 'row',
    width: '33.3%',
    height: '16.7%',
  },
});
