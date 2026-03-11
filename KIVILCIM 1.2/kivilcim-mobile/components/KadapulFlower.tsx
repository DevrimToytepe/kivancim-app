import React, { useMemo } from 'react';
import { Dimensions } from 'react-native';
import { 
  Canvas, 
  Path, 
  Group, 
  Skia, 
  LinearGradient, 
  vec,
  Circle,
  useDerivedValue as useSkiaDerivedValue,
} from '@shopify/react-native-skia';
import { 
  SharedValue, 
  interpolate, 
  Extrapolate 
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const CANVAS_SIZE = width * 0.8;
const CENTER = CANVAS_SIZE / 2;

interface KadapulFlowerProps {
  progress: SharedValue<number>; // 0 to 1 Reanimated value
}

export const KadapulFlower: React.FC<KadapulFlowerProps> = ({ progress }) => {
  // Constant paths for petals
  const outerPath = useMemo(() => {
    const path = Skia.Path.Make();
    path.moveTo(0, 0);
    path.cubicTo(-35, -50, -15, -100, 0, -100);
    path.cubicTo(15, -100, 35, -50, 0, 0);
    path.close();
    return path;
  }, []);

  const innerPath = useMemo(() => {
    const path = Skia.Path.Make();
    path.moveTo(0, 0);
    path.cubicTo(-20, -30, -10, -60, 0, -60);
    path.cubicTo(10, -60, 20, -30, 0, 0);
    path.close();
    return path;
  }, []);

  // Stamen threads (18)
  const stamens = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      angle: (i / 18) * 2 * Math.PI,
      length: 25 + Math.random() * 10
    }));
  }, []);

  return (
    <Canvas style={{ width: CANVAS_SIZE, height: CANVAS_SIZE }}>
      <Group transform={[{ translateX: CENTER }, { translateY: CENTER }]}>
        
        {/* Outer Petals (6) */}
        {Array.from({ length: 6 }).map((_, i) => (
          <Group key={`outer-${i}`} transform={[{ rotate: (i * 60 * Math.PI) / 180 }]}>
            <Petal path={outerPath} progress={progress} delay={0} scale={1} color1="#fffaf0" color2="#f5eadc" />
          </Group>
        ))}

        {/* Inner Petals (6) */}
        {Array.from({ length: 6 }).map((_, i) => (
          <Group key={`inner-${i}`} transform={[{ rotate: (i * 60 + 30) * Math.PI / 180 }]}>
            <Petal path={innerPath} progress={progress} delay={0.3} scale={0.7} color1="#ffffff" color2="#fffaf0" />
          </Group>
        ))}

        {/* Stamen (18 threads) */}
        {stamens.map((s, i) => (
          <Stamen key={`stamen-${i}`} angle={s.angle} length={s.length} progress={progress} />
        ))}

        <Circle c={vec(0, 0)} r={5} color="#fff8e1" />
      </Group>
    </Canvas>
  );
};

const Petal: React.FC<{ path: any; progress: SharedValue<number>; delay: number; scale: number; color1: string; color2: string }> = ({ path, progress, delay, scale, color1, color2 }) => {
  // Use Skia's internal useDerivedValue for reactivity
  const transform = useSkiaDerivedValue(() => {
    const p = progress.value;
    const s = interpolate(p, [delay, 1], [0.01, scale], Extrapolate.CLAMP);
    const r = interpolate(p, [delay, 1], [-0.5, 0], Extrapolate.CLAMP);
    return [{ scale: s }, { rotate: r }];
  }, [progress]);

  const opacity = useSkiaDerivedValue(() => {
    return interpolate(progress.value, [delay, delay + 0.1], [0, 1], Extrapolate.CLAMP);
  }, [progress]);

  return (
    <Group transform={transform} opacity={opacity}>
      <Path path={path}>
        <LinearGradient start={vec(0, 0)} end={vec(0, -100)} colors={[color1, color2]} />
      </Path>
    </Group>
  );
};

const Stamen: React.FC<{ angle: number; length: number; progress: SharedValue<number> }> = ({ angle, length, progress }) => {
  const stamenPath = useMemo(() => {
    const p = Skia.Path.Make();
    p.moveTo(0, 0);
    p.lineTo(Math.cos(angle) * length, Math.sin(angle) * length);
    return p;
  }, [angle, length]);

  const opacity = useSkiaDerivedValue(() => {
    return interpolate(progress.value, [0.7, 1], [0, 1], Extrapolate.CLAMP);
  }, [progress]);

  return (
    <Path 
      path={stamenPath} 
      color="#fff176" 
      strokeWidth={0.5} 
      style="stroke" 
      opacity={opacity}
    />
  );
};

