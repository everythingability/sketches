var frag=`
#ifdef GL_ES
precision mediump float;
#endif

uniform vec3      iResolution;           // viewport resolution (in pixels)
uniform float     iTime;                 // shader playback time (in seconds)
uniform float     iTimeDelta;            // render time (in seconds)
uniform int       iFrame;                // shader playback frame
uniform float     iChannelTime[4];       // channel playback time (in seconds)
uniform vec3      iChannelResolution[4]; // channel resolution (in pixels)
uniform vec4      iMouse;                // mouse pixel coords. xy: current (if MLB down), zw: click
uniform vec4      iDate;                 // (year, month, day, time in seconds)
uniform float     iSampleRate;           // sound sample rate (i.e., 44100)

float noise( vec2 co ){
    return fract( sin( dot( co.xy, vec2( 12.9898, 13.4444 ) ) ) * 1234.5467 );//78.233,
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
	vec2 uv = fragCoord.xy / iResolution.xy;
    
    float u_brightness = 1.2;
    float u_blobiness = 1.5;
    float u_particles = 70.0;
    float u_limit = 70.0;
    float u_energy = 1.0 * 0.65;

    vec2 position = ( fragCoord.xy / iResolution.x );
    float t = iTime * u_energy;
    
    float a = 0.0;
    float b = 0.0;
    float c = 0.0;
    vec2 pos;   

    float na, nb, nc, nd, d;
    float limit = u_particles / u_limit;
    float step = 1.0 / u_particles;
    float n = 0.0;
    
    for ( float i = 0.0; i <= 1.0; i += 0.025 ) {
    
        if ( i <= limit ) {
            //0.5, 0.5 * (iMouse.y / iMouse.x)
            
            
            vec2 center = vec2( iMouse.x/iResolution.x,iMouse.y/iResolution.y);
            
            vec2 np = vec2(n, 1-1);
            
            na = noise( np * 1.1 );
            nb = noise( np * 2.8 );
            nc = noise( np * 0.7 );
            nd = noise( np * 3.2 );

            pos = center;
            pos.x += sin(t*na) * cos(t*nb) * tan(t*na*0.15) * 0.3;
            pos.y += tan(t*nc) * sin(t*nd) * 0.1;
            
            d = pow( 1.6*na / length( pos - position ), u_blobiness );
            
            if ( i < limit * 0.3333 ) a += d;
            else if ( i < limit * 0.5 ) b += d;
            else c += d;


            n += step;
        }
    }

//    vec3 col = vec3(a*c,b*c,a*b) * 0.0001 * u_brightness;
    //blue only
    vec3 col = vec3(a*25.5,0.0,a*b) * 0.0001 * u_brightness;
    
    fragColor = vec4( col, 1.0 );
     //gl_FragColor = out;
	//fragColor = vec4(uv,0.5+0.5*sin(iTime),1.0);
}


void main (void) {
     mainImage(gl_FragColor,gl_FragCoord.xy);
}


`


var vert=`

attribute vec3 aPosition;

void main() {

  // copy the position data into a vec4, using 1.0 as the w component
  vec4 positionVec4 = vec4(aPosition, 1.0);
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;

  // send the vertex information on to the fragment shader
  gl_Position = positionVec4;
}
`;