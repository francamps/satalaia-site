import { useCallback, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "@/assets/threejs/addons/OrbitControls.js";

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";

import { CustomOutlinePass } from "@/assets/threejs/addons/CustomOutlinePass.js";
import FindSurfaces from "@/assets/threejs/addons/FindSurfaces.js";

import styles from "@/components/Canvas.module.css";

const Canvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const requestRef = useRef<any>(null);
    const composerRef = useRef<any>(null);
    const cameraRef = useRef<any>(null);

    const width = 600; //window.innerWidth;
    const height = 600; //window.innerHeight;
    const scene = new THREE.Scene();

    //Add Renderer
    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const renderer = new THREE.WebGLRenderer({
                antialias: true,
                canvas,
                alpha: true,
            });
            renderer.setClearColor(0x000000, 0); // the default
            renderer.setSize(width, height);
            renderer.setPixelRatio(window.devicePixelRatio);

            //add Camera
            cameraRef.current = new THREE.PerspectiveCamera(
                75,
                width / height,
                0.1,
                1000
            );

            cameraRef.current.position.x = -2.7666651976750187;
            cameraRef.current.position.y = 2.4301866055440726;
            cameraRef.current.position.z = -4.670222058565317;

            cameraRef.current.lookAt(0, 0, 0);

            //Camera Controls
            //const controls = new OrbitControls(
            //    cameraRef.current,
            //    renderer.domElement
            //);
            //
            //controls.target.x = -0.032275654135816935;
            //controls.target.y = 2.0338707166512435;
            //controls.target.z = -0.19146553019782225;

            // Set up post processing
            // Create a render target that holds a depthTexture so we can use it in the outline pass
            // See: https://threejs.org/docs/index.html#api/en/renderers/WebGLRenderTarget.depthBuffer
            const depthTexture = new THREE.DepthTexture();
            const renderTarget = new THREE.WebGLRenderTarget(width, height, {
                depthTexture: depthTexture,
                depthBuffer: true,
            });

            // Initial render pass.
            composerRef.current = new EffectComposer(renderer, renderTarget);
            //const pass = new RenderPass(scene, cameraRef.current);
            //composerRef.current.addPass(pass);

            // Outline pass.
            const customOutline = new CustomOutlinePass(
                new THREE.Vector2(width, height),
                scene,
                cameraRef.current
            );
            composerRef.current.addPass(customOutline);

            // Antialias pass.
            const effectFXAA = new ShaderPass(FXAAShader);
            effectFXAA.uniforms["resolution"].value.set(1 / width, 1 / height);
            composerRef.current.addPass(effectFXAA);

            renderer.setPixelRatio(window.devicePixelRatio);
            composerRef.current.setPixelRatio(window.devicePixelRatio);

            const surfaceFinder = new FindSurfaces();

            const loader = new GLTFLoader();

            // Load a glTF resource
            loader.load(
                // resource URL
                "assets/talaiot.gltf",
                // called when the resource is loaded
                function (gltf) {
                    scene.add(gltf.scene);

                    surfaceFinder.surfaceId = 0;
                    scene.traverse((node) => {
                        if (node.type == "Mesh") {
                            const colorsTypedArray =
                                surfaceFinder.getSurfaceIdAttribute(node);
                            node.geometry.setAttribute(
                                "color",
                                new THREE.BufferAttribute(colorsTypedArray, 4)
                            );
                        }
                    });

                    customOutline.updateMaxSurfaceId(
                        surfaceFinder.surfaceId + 1
                    );
                }
            );
        }
    }, [canvasRef]);

    const animate = useCallback(
        (time: number) => {
            if (composerRef.current) {
                cameraRef.current.position.set(
                    10 * Math.sin(time / 900),
                    2.4301866055440726,
                    10 * Math.cos(time / 900)
                );
                cameraRef.current.lookAt(0, 0, 0);
                // The 'state' will always be the initial value here
                requestRef.current = requestAnimationFrame(animate);
                composerRef.current.render();
            }
        },
        [composerRef]
    );

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, [animate]); // Make sure the effect runs only once

    useEffect(() => {
        function onWindowResize() {
            cameraRef.current.aspect = window.innerWidth / window.innerHeight;
            cameraRef.current.updateProjectionMatrix();

            renderer.setSize(window.innerWidth, window.innerHeight);
            composerRef.current.setSize(window.innerWidth, window.innerHeight);
            effectFXAA.setSize(window.innerWidth, window.innerHeight);
            customOutline.setSize(window.innerWidth, window.innerHeight);

            renderer.setPixelRatio(window.devicePixelRatio);
            composerRef.current.setPixelRatio(window.devicePixelRatio);

            effectFXAA.uniforms["resolution"].value.set(
                1 / window.innerWidth,
                1 / window.innerHeight
            );
        }
        window.addEventListener("resize", onWindowResize, false);

        return () => {
            window.removeEventListener("resize", onWindowResize);
        };
    }, []);

    return (
        <div className={styles.canvas}>
            <h2>Sa Talaia</h2>
            <h4>Intelligent world building</h4>
            <canvas ref={canvasRef}></canvas>
        </div>
    );
};

export default Canvas;
