import {useFocusEffect} from '@react-navigation/native';
import {
  Circle,
  LinearGradient,
  vec,
  useFont,
  Canvas,
  DashPathEffect,
  Rect,
  Group,
  Fill,
} from '@shopify/react-native-skia';
import React from 'react';
import {SafeAreaView, View, Text, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  type SharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import {scale} from 'react-native-size-matters';
import {
  Bar,
  CartesianChart,
  useChartPressState,
  Line,
  Area,
  Scatter,
} from 'victory-native';
import NK_Mono from 'src/assets/fonts/NK_Mono.ttf';
import {palette} from 'src/theme';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

const NUMBER_OF_POINT = 12;
const INIT_BAR_CHART_DATA = Array.from(
  {length: NUMBER_OF_POINT},
  (_, index) => ({
    // Starting at 1 for January
    month: index + 1,
    // Randomizing the listen count between 100 and 50
    listenCount: Math.floor(Math.random() * (100 - 50 + 1)) + 50,
  }),
);

const ChartScreen = () => {
  const [data, setData] = React.useState(INIT_BAR_CHART_DATA);
  const timerIntervalId = React.useRef<NodeJS.Timer>();
  const font = useFont(NK_Mono, 16);
  const {state: firstPress, isActive: isFirstActive} = useChartPressState({
    x: 0,
    y: {listenCount: 0},
  });
  const {state: secondPress, isActive: isSecondActive} = useChartPressState({
    x: 0,
    y: {listenCount: 0},
  });
  const pressedBall = useSharedValue(false);
  const offsetBall = useSharedValue({x: 0, y: 0});
  const pressedChart = useSharedValue(false);
  const offsetTooltipChart = useSharedValue({x: 0, y: 0});

  useFocusEffect(
    React.useCallback(() => {
      timerIntervalId.current = setInterval(() => {
        const dummy = Array.from({length: NUMBER_OF_POINT}, (_, index) => ({
          month: index + 1,
          listenCount: Math.floor(Math.random() * (100 - 50 + 1)) + 50,
          highTmp: Math.floor(Math.random() * 100),
        }));
        setData(dummy);
      }, 5000);

      return () => {
        clearInterval(timerIntervalId.current);
      };
    }, []),
  );

  const tap = Gesture.Tap()
    .onBegin(event => {
      pressedChart.value = true;
      offsetTooltipChart.value = {
        x: event.absoluteX,
        y: event.absoluteY,
      };
    })
    .onFinalize(() => {
      pressedChart.value = false;
    });

  const pan = Gesture.Pan()
    .onBegin(event => {
      pressedBall.value = true;
    })
    .onChange(event => {
      offsetBall.value = {
        x: event.translationX,
        y: event.translationY,
      };
    })
    .onFinalize(event => {
      offsetBall.value = {
        x: withSpring(0),
        y: withSpring(0),
      };
      pressedBall.value = false;
    });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {translateX: offsetBall.value.x},
      {translateY: offsetBall.value.y},
      {scale: withTiming(pressedBall.value ? 1.2 : 1)},
    ],
    backgroundColor: pressedBall.value ? '#FFE04B' : '#b58df1',
  }));

  return (
    <SafeAreaView style={{flex: 1, paddingHorizontal: scale(20)}}>
      <View style={{height: scale(300), marginTop: scale(40)}}>
        <CartesianChart
          data={data}
          xKey="month"
          yKeys={['listenCount']}
          domainPadding={{left: 20, right: 20, top: 0}}
          axisOptions={{
            font,
            formatXLabel(value) {
              const date = new Date(2023, value - 1);
              return date.toLocaleString('default', {month: 'short'});
            },
          }}
          chartPressState={[firstPress, secondPress]}>
          {({points, chartBounds}) => {
            return (
              <React.Fragment>
                <Bar
                  chartBounds={chartBounds}
                  points={points.listenCount}
                  animate={{
                    duration: 500,
                    type: 'spring',
                  }}
                  roundedCorners={{
                    topLeft: 6,
                    topRight: 6,
                  }}>
                  <LinearGradient
                    start={vec(0, 0)}
                    end={vec(0, 400)}
                    colors={['#a78bfa', '#a78bfa50']}
                  />
                </Bar>
                <Line
                  points={points.listenCount}
                  color={palette['primary-1']}
                  strokeWidth={3}
                  curveType="cardinal"
                />

                {isFirstActive && (
                  <ToolTip
                    x={firstPress.x.position}
                    y={firstPress.y.listenCount.position}
                  />
                )}
                {isSecondActive && (
                  <ToolTip
                    x={secondPress.x.position}
                    y={secondPress.y.listenCount.position}
                  />
                )}
              </React.Fragment>
            );
          }}
        </CartesianChart>
      </View>
      <GestureDetector gesture={pan}>
        <Animated.View style={[styles.circle, animatedStyles]} />
      </GestureDetector>
    </SafeAreaView>
  );
};

function ToolTip({
  x,
  y,
  color = palette['form-error'],
}: {
  x: SharedValue<number>;
  y: SharedValue<number>;
  color?: string;
}) {
  const radius = 10;
  return (
    <Group color={color} style="stroke" strokeWidth={radius}>
      <Circle cx={x} cy={y} r={radius / 2} />
      <Circle cx={x} cy={y} r={radius / 3} color="white" />
    </Group>
  );
}

const styles = StyleSheet.create({
  circle: {
    width: 70,
    height: 70,
    borderRadius: 100,
    alignSelf: 'center',
  },
});

export default ChartScreen;
