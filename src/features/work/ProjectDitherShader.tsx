import { useEffect, useRef } from 'react';

export type DitherColor = readonly [number, number, number];

export interface DitherPalette {
  readonly dark: DitherColor;
  readonly accent: DitherColor;
  readonly paper: DitherColor;
  readonly hoverAccent: DitherColor;
  readonly hoverPaper: DitherColor;
}

interface ProjectDitherShaderProps {
  readonly active: boolean;
  readonly palette: DitherPalette;
}

const vertexShaderSource = `#version 300 es
  in vec2 a_position;
  out vec2 v_uv;

  void main() {
    v_uv = a_position * .5 + .5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const fragmentShaderSource = `#version 300 es
  precision highp float;

  in vec2 v_uv;
  out vec4 outColor;

  uniform vec2 u_resolution;
  uniform float u_time;
  uniform float u_hover;
  uniform vec3 u_dark;
  uniform vec3 u_accent;
  uniform vec3 u_paper;
  uniform vec3 u_hover_accent;
  uniform vec3 u_hover_paper;

  float hash21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);

    return mix(
      mix(hash21(i), hash21(i + vec2(1.0, 0.0)), f.x),
      mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0)), f.x),
      f.y
    );
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = .5;

    for (int index = 0; index < 5; index++) {
      value += amplitude * noise(p);
      p = p * 2.02 + vec2(7.17, 3.41);
      amplitude *= .49;
    }

    return value;
  }

  float bayer4(vec2 fragmentPosition) {
    ivec2 position = ivec2(mod(floor(fragmentPosition), 4.0));
    int index = position.x + position.y * 4;
    float matrix[16] = float[16](
      0.0, 8.0, 2.0, 10.0,
      12.0, 4.0, 14.0, 6.0,
      3.0, 11.0, 1.0, 9.0,
      15.0, 7.0, 13.0, 5.0
    );
    return matrix[index] / 16.0;
  }

  void main() {
    vec2 aspect = vec2(u_resolution.x / max(u_resolution.y, 1.0), 1.0);
    vec2 position = (v_uv - .5) * aspect;

    float primaryNoise = fbm(position * 1.7 + vec2(u_time * .038, -u_time * .024));
    float wave = .5 + .5 * sin(
      position.x * 3.2 +
      position.y * 2.4 +
      primaryNoise * 3.2 +
      u_time * .11
    );
    float value = clamp(primaryNoise * .58 + wave * .42, 0.0, 1.0);

    float dither = bayer4(floor(gl_FragCoord.xy / 2.0)) - .5;
    float quantized = floor(value * 7.0 + dither) / 7.0;

    vec3 accent = mix(u_accent, u_hover_accent, u_hover);
    vec3 paper = mix(u_paper, u_hover_paper, u_hover);
    vec3 color = mix(u_dark, accent, quantized);
    color = mix(color, paper, smoothstep(.68, .98, quantized) * .48);

    float vignette = smoothstep(1.16, .28, length(position) * .66);
    color *= .82 + vignette * .18;

    float grain = hash21(floor(gl_FragCoord.xy / 2.2) + floor(u_time * 2.0)) - .5;
    color += grain * .007;

    outColor = vec4(clamp(color, 0.0, 1.0), 1.0);
  }
`;

function compileShader(
  gl: WebGL2RenderingContext,
  type: number,
  source: string,
): WebGLShader | null {
  const shader = gl.createShader(type);

  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function createProgram(gl: WebGL2RenderingContext): WebGLProgram | null {
  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

  if (!vertexShader || !fragmentShader) return null;

  const program = gl.createProgram();

  if (!program) return null;

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return null;
  }

  return program;
}

function toCssColor(color: DitherColor): string {
  const channels = color.map((channel) => Math.round(channel * 255));
  return `rgb(${channels.join(' ')})`;
}

export function ProjectDitherShader({
  active,
  palette,
}: ProjectDitherShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const activeRef = useRef(active);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas?.getContext('webgl2', {
      alpha: false,
      antialias: false,
      powerPreference: 'low-power',
    });

    if (!canvas || !gl) return;

    const program = createProgram(gl);

    if (!program) return;

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    const buffer = gl.createBuffer();

    if (positionLocation < 0 || !buffer) {
      gl.deleteProgram(program);
      return;
    }

    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
    const timeLocation = gl.getUniformLocation(program, 'u_time');
    const hoverLocation = gl.getUniformLocation(program, 'u_hover');

    gl.uniform3fv(
      gl.getUniformLocation(program, 'u_dark'),
      new Float32Array(palette.dark),
    );
    gl.uniform3fv(
      gl.getUniformLocation(program, 'u_accent'),
      new Float32Array(palette.accent),
    );
    gl.uniform3fv(
      gl.getUniformLocation(program, 'u_paper'),
      new Float32Array(palette.paper),
    );
    gl.uniform3fv(
      gl.getUniformLocation(program, 'u_hover_accent'),
      new Float32Array(palette.hoverAccent),
    );
    gl.uniform3fv(
      gl.getUniformLocation(program, 'u_hover_paper'),
      new Float32Array(palette.hoverPaper),
    );

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reducedMotion = reducedMotionQuery.matches;
    let visible = true;
    let hoverAmount = activeRef.current ? 1 : 0;
    let animationFrame = 0;
    const startedAt = performance.now();

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.35);
      const width = Math.max(1, Math.round(bounds.width * pixelRatio));
      const height = Math.max(1, Math.round(bounds.height * pixelRatio));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    const resizeObserver =
      typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(resize);
    resizeObserver?.observe(canvas);
    resize();

    const intersectionObserver =
      typeof IntersectionObserver === 'undefined'
        ? null
        : new IntersectionObserver(
            ([entry]) => {
              visible = entry?.isIntersecting ?? true;
            },
            { rootMargin: '180px' },
          );
    intersectionObserver?.observe(canvas);

    const handleMotionPreference = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;
    };
    reducedMotionQuery.addEventListener('change', handleMotionPreference);

    const render = (now: number) => {
      if (visible) {
        const target = activeRef.current ? 1 : 0;
        hoverAmount += (target - hoverAmount) * (reducedMotion ? 1 : 0.055);

        gl.useProgram(program);
        gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
        gl.uniform1f(timeLocation, reducedMotion ? 0 : (now - startedAt) * 0.001);
        gl.uniform1f(hoverLocation, hoverAmount);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }

      animationFrame = window.requestAnimationFrame(render);
    };

    animationFrame = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      reducedMotionQuery.removeEventListener('change', handleMotionPreference);
      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    };
  }, [palette]);

  return (
    <canvas
      ref={canvasRef}
      className="project-dither-shader"
      aria-hidden="true"
      style={{
        background: `linear-gradient(135deg, ${toCssColor(
          palette.dark,
        )}, ${toCssColor(palette.accent)})`,
      }}
    />
  );
}
