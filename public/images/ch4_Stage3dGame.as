////////////////////////////////////////////////////////////
// Stage3D Game Template - Chapter 4
// (c) by Christer Kaitila (http://www.mcfunkypants.com)
// http://www.mcfunkypants.com/molehill/chapter_4_demo/
////////////////////////////////////////////////////////////
// With grateful acknowledgements to:
// Thibault Imbert, Ryan Speets, Alejandro Santander, 
// Mikko Haapoja, Evan Miller and Terry Patton
// for their valuable contributions.
////////////////////////////////////////////////////////////
// Please buy the book:
// http://link.packtpub.com/KfKeo6
////////////////////////////////////////////////////////////
package
{

import com.adobe.utils.*;
import flash.display.*;
import flash.display3D.*;
import flash.display3D.textures.*;
import flash.events.*;
import flash.geom.*;
import flash.utils.*;
import flash.text.*;

[SWF(width="640", height="480", frameRate="60", 
backgroundColor="#FFFFFF")]	

public class Stage3dGame extends Sprite
{
// used by the FPS display
private var fpsLast:uint = getTimer();
private var fpsTicks:uint = 0;
private var fpsTf:TextField;

// constants used during inits
private const swfWidth:int = 640;
private const swfHeight:int = 480;
private const textureSize:int = 512;

// the 3d graphics window on the stage
private var context3D:Context3D;
// the compiled shaders used to render our mesh
private var shaderProgram1:Program3D;
private var shaderProgram2:Program3D;
private var shaderProgram3:Program3D;
private var shaderProgram4:Program3D;
// the uploaded verteces used by our mesh
private var vertexBuffer:VertexBuffer3D;
// the uploaded indeces of each vertex of the mesh
private var indexBuffer:IndexBuffer3D;
// the data that defines our 3d mesh model
private var meshVertexData:Vector.<Number>;
// the indeces that define what data is used by each vertex
private var meshIndexData:Vector.<uint>;

// matrices that affect the mesh location and camera angles
private var projectionmatrix:PerspectiveMatrix3D = 
	new PerspectiveMatrix3D();
private var modelmatrix:Matrix3D = new Matrix3D();
private var viewmatrix:Matrix3D = new Matrix3D();
private var modelViewProjection:Matrix3D = new Matrix3D();

// a simple frame counter used for animation
private var t:Number = 0;
// a reusable loop counter
private var looptemp:int = 0;

/* TEXTURE: Pure AS3 and Flex version:
 * if you are using Adobe Flash CS5 
 * comment out the next two lines of code */
[Embed (source = "texture.jpg")] 
private var myTextureBitmap:Class;
private var myTextureData:Bitmap = new myTextureBitmap();
			
/* TEXTURE: Flash CS5 version:
 * add the jpg to your library (F11)
 * right click it and edit the advanced properties so
 * it is exported for use in Actionscript 
 * and call it myTextureBitmap
 * if using Flex/FlashBuilder/FlashDevelop 
 * comment out the following lines of code */
//private var myBitmapDataObject:myTextureBitmapData = 
	//new myTextureBitmapData(textureSize, textureSize);
//private var myTextureData:Bitmap = 
	//new Bitmap(myBitmapDataObject);
					
// The Stage3d Texture that uses the above myTextureData
private var myTexture:Texture;

public function Stage3dGame() 
{
	if (stage != null) 
		init();
	else 
		addEventListener(Event.ADDED_TO_STAGE, init);
}

private function init(e:Event = null):void 
{

	if (hasEventListener(Event.ADDED_TO_STAGE))
		removeEventListener(Event.ADDED_TO_STAGE, init);

	stage.frameRate = 60;
	stage.scaleMode = StageScaleMode.NO_SCALE;
	stage.align = StageAlign.TOP_LEFT;
	
	// add some text labels
	initGUI();
	
	// and request a context3D from Stage3d
	stage.stage3Ds[0].addEventListener(
		Event.CONTEXT3D_CREATE, onContext3DCreate);
	stage.stage3Ds[0].requestContext3D();

}

private function initGUI():void
{
	// a text format descriptor used by all gui labels
	var myFormat:TextFormat = new TextFormat();  
	myFormat.color = 0xFFFFFF;
	myFormat.size = 13;

	// create an FPSCounter that displays the framerate on screen
	fpsTf = new TextField();
	fpsTf.x = 0;
	fpsTf.y = 0;
	fpsTf.selectable = false;
	fpsTf.autoSize = TextFieldAutoSize.LEFT;
	fpsTf.defaultTextFormat = myFormat;
	fpsTf.text = "Initializing Stage3d...";
	addChild(fpsTf);

	// add some labels to describe each shader

	var label1:TextField = new TextField();
	label1.x = 100;
	label1.y = 180;
	label1.selectable = false;  
	label1.autoSize = TextFieldAutoSize.LEFT;  
	label1.defaultTextFormat = myFormat;
	label1.text = "Shader 1: Textured";
	addChild(label1);

	var label2:TextField = new TextField();
	label2.x = 400;
	label2.y = 180;
	label2.selectable = false;  
	label2.autoSize = TextFieldAutoSize.LEFT;  
	label2.defaultTextFormat = myFormat;
	label2.text = "Shader 2: Vertex RGB";
	addChild(label2);
	
	var label3:TextField = new TextField();
	label3.x = 80;
	label3.y = 440;
	label3.selectable = false;  
	label3.autoSize = TextFieldAutoSize.LEFT;  
	label3.defaultTextFormat = myFormat;
	label3.text = "Shader 3: Vertex RGB + Textured";
	addChild(label3);
	
	var label4:TextField = new TextField();
	label4.x = 340;
	label4.y = 440;
	label4.selectable = false;  
	label4.autoSize = TextFieldAutoSize.LEFT;  
	label4.defaultTextFormat = myFormat;
	label4.text = "Shader 4: Textured + setProgramConstants";
	addChild(label4);
}

private function onContext3DCreate(event:Event):void 
{
	// Remove existing frame handler. Note that a context
	// loss can occur at any time which will force you
	// to recreate all objects we create here.
	// A context loss occurs for instance if you hit
	// CTRL-ALT-DELETE on Windows.			
	// It takes a while before a new context is available
	// hence removing the enterFrame handler is important!

	if (hasEventListener(Event.ENTER_FRAME))
		removeEventListener(Event.ENTER_FRAME,enterFrame);
	
	// Obtain the current context
	var t:Stage3D = event.target as Stage3D;					
	context3D = t.context3D; 	

	if (context3D == null) 
	{
		// Currently no 3d context is available (error!)
		return;
	}
	
	// Disabling error checking will drastically improve performance.
	// If set to true, Flash sends helpful error messages regarding
	// AGAL compilation errors, uninitialized program constants, etc.
	context3D.enableErrorChecking = true;
	
	// Initialize our mesh data
	initData();
	
	// The 3d back buffer size is in pixels
	context3D.configureBackBuffer(swfWidth, swfHeight, 0, true);

	// assemble all the shaders we need
	initShaders();

	// upload the mesh indexes
	indexBuffer = context3D.createIndexBuffer(meshIndexData.length);
	indexBuffer.uploadFromVector(
		meshIndexData, 0, meshIndexData.length);
	
	// upload the mesh vertex data
	// since our particular data is 
	// x, y, z, u, v, nx, ny, nz, r, g, b, a
	// each vertex uses 12 array elements
	vertexBuffer = context3D.createVertexBuffer(
		meshVertexData.length/12, 12); 
	vertexBuffer.uploadFromVector(meshVertexData, 0, 
		meshVertexData.length/12);
	
	// Generate mipmaps (this is likely to break on 
	// non-square textures, non-power of two, etc)
	myTexture = context3D.createTexture(textureSize, textureSize, 
		Context3DTextureFormat.BGRA, false);
	uploadTextureWithMipmaps(myTexture, myTextureData.bitmapData);
	
	// create projection matrix for our 3D scene
	projectionmatrix.identity();
	// 45 degrees FOV, 640/480 aspect ratio, 0.1=near, 100=far
	projectionmatrix.perspectiveFieldOfViewRH(
		45.0, swfWidth / swfHeight, 0.01, 100.0);
	
	// create a matrix that defines the camera location
	viewmatrix.identity();
	// move the camera back a little so we can see the mesh
	viewmatrix.appendTranslation(0,0,-10);
	
	// start animating
	addEventListener(Event.ENTER_FRAME,enterFrame);
}

public function uploadTextureWithMipmaps(dest:Texture, src:BitmapData):void
{
	var ws:int = src.width;
	var hs:int = src.height;
	var level:int = 0;
	var tmp:BitmapData;
	var transform:Matrix = new Matrix();
 
	tmp = new BitmapData(src.width, src.height, true, 0x00000000);
 
	while ( ws >= 1 && hs >= 1 )
	{ 
		tmp.draw(src, transform, null, null, null, true); 
		dest.uploadFromBitmapData(tmp, level);
		transform.scale(0.5, 0.5);
		level++;
		ws >>= 1;
		hs >>= 1;
		if (hs && ws) 
		{
			tmp.dispose();
			tmp = new BitmapData(ws, hs, true, 0x00000000);
		}
	}
	tmp.dispose();
}

// create four different shaders
private function initShaders():void
{
	// A simple vertex shader which does a 3D transformation
	// for simplicity, it is used by all four shaders
	var vertexShaderAssembler:AGALMiniAssembler = 
		new AGALMiniAssembler();
	vertexShaderAssembler.assemble
	( 
		Context3DProgramType.VERTEX,
		// 4x4 matrix multiply to get camera angle	
		"m44 op, va0, vc0\n" +
		// tell fragment shader about XYZ
		"mov v0, va0\n" +
		// tell fragment shader about UV
		"mov v1, va1\n" +
		// tell fragment shader about RGBA
		"mov v2, va2\n"
	);			
	
	// textured using UV coordinates
	var fragmentShaderAssembler1:AGALMiniAssembler 
		= new AGALMiniAssembler();
	fragmentShaderAssembler1.assemble
	( 
		Context3DProgramType.FRAGMENT,	
		// grab the texture color from texture 0 
		// and uv coordinates from varying register 1
		// and store the interpolated value in ft0
		"tex ft0, v1, fs0 <2d,repeat,miplinear>\n" +	
		// move this value to the output color
		"mov oc, ft0\n"
	);
	
	// no texture, RGBA from the vertex buffer data
	var fragmentShaderAssembler2:AGALMiniAssembler 
		= new AGALMiniAssembler();
	fragmentShaderAssembler2.assemble
	( 
		Context3DProgramType.FRAGMENT,	
		// grab the color from the v2 register
		// which was set in the vertex program
		
		// ERRATA: this one line can be removed:
		// "sub ft0, v2, fc1\n" +
		
		"mov oc, v2\n"
	);

	// textured using UV coordinates AND colored by vertex RGB
	var fragmentShaderAssembler3:AGALMiniAssembler 
		= new AGALMiniAssembler();
	fragmentShaderAssembler3.assemble
	( 
		Context3DProgramType.FRAGMENT,	
		// grab the texture color from texture 0 
		// and uv coordinates from varying register 1
		"tex ft0, v1, fs0 <2d,repeat,miplinear>\n" +	
		// multiply by the value stored in v2 (the vertex rgb)
		"mul ft1, v2, ft0\n" +
		// move this value to the output color
		"mov oc, ft1\n"
	);

	// textured using UV coordinates and 
	// tinted using a fragment constant
	var fragmentShaderAssembler4:AGALMiniAssembler 
		= new AGALMiniAssembler();
	fragmentShaderAssembler4.assemble
	( 
		Context3DProgramType.FRAGMENT,	
		// grab the texture color from texture 0 
		// and uv coordinates from varying register 1
		"tex ft0, v1, fs0 <2d,repeat,miplinear>\n" +	
		// multiply by the value stored in fc0
		"mul ft1, fc0, ft0\n" +
		// move this value to the output color
		"mov oc, ft1\n"
	);

	// combine shaders into a program which we then upload to the GPU
	shaderProgram1 = context3D.createProgram();
	shaderProgram1.upload(
		vertexShaderAssembler.agalcode, 
		fragmentShaderAssembler1.agalcode);
	
	shaderProgram2 = context3D.createProgram();
	shaderProgram2.upload(
		vertexShaderAssembler.agalcode, 
		fragmentShaderAssembler2.agalcode);
	
	shaderProgram3 = context3D.createProgram();
	shaderProgram3.upload(
		vertexShaderAssembler.agalcode, 
		fragmentShaderAssembler3.agalcode);
	
	shaderProgram4 = context3D.createProgram();
	shaderProgram4.upload(
		vertexShaderAssembler.agalcode, 
		fragmentShaderAssembler4.agalcode);
}

private function enterFrame(e:Event):void 
{
	// clear scene before rendering is mandatory
	context3D.clear(0,0,0); 
	
	// rotate more next frame
	t += 2.0;
	
	// loop through each mesh we want to draw
	for (looptemp = 0; looptemp < 4; looptemp++)
	{
	
		// clear the transformation matrix to 0,0,0
		modelmatrix.identity();
		
		// each mesh has a different texture, 
		// shader, position and spin speed
		switch(looptemp)
		{
			case 0:
				context3D.setTextureAt(0, myTexture);
				context3D.setProgram ( shaderProgram1 );
				modelmatrix.appendRotation(t*0.7, Vector3D.Y_AXIS);
				modelmatrix.appendRotation(t*0.6, Vector3D.X_AXIS);
				modelmatrix.appendRotation(t*1.0, Vector3D.Y_AXIS);
				modelmatrix.appendTranslation(-3, 3, 0);
				break;
			case 1:
				context3D.setTextureAt(0, null);
				context3D.setProgram ( shaderProgram2 );
				modelmatrix.appendRotation(t*-0.2, Vector3D.Y_AXIS);
				modelmatrix.appendRotation(t*0.4, Vector3D.X_AXIS);
				modelmatrix.appendRotation(t*0.7, Vector3D.Y_AXIS);
				modelmatrix.appendTranslation(3, 3, 0);
				break;
			case 2:
				context3D.setTextureAt(0, myTexture);
				context3D.setProgram ( shaderProgram3 );
				modelmatrix.appendRotation(t*1.0, Vector3D.Y_AXIS);
				modelmatrix.appendRotation(t*-0.2, Vector3D.X_AXIS);
				modelmatrix.appendRotation(t*0.3, Vector3D.Y_AXIS);
				modelmatrix.appendTranslation(-3, -3, 0);
				break;
			case 3:
				context3D.setProgramConstantsFromVector(
					Context3DProgramType.FRAGMENT, 0, Vector.<Number>
					([ 1, Math.abs(Math.cos(t/50)), 0, 1 ]) );
				context3D.setTextureAt(0, myTexture);
				context3D.setProgram ( shaderProgram4 );
				modelmatrix.appendRotation(t*0.3, Vector3D.Y_AXIS);
				modelmatrix.appendRotation(t*0.3, Vector3D.X_AXIS);
				modelmatrix.appendRotation(t*-0.3, Vector3D.Y_AXIS);
				modelmatrix.appendTranslation(3, -3, 0);
				break;
		}

		// clear the matrix and append new angles
		modelViewProjection.identity();
		modelViewProjection.append(modelmatrix);
		modelViewProjection.append(viewmatrix);
		modelViewProjection.append(projectionmatrix);
		
		// pass our matrix data to the shader program
		context3D.setProgramConstantsFromMatrix(
			Context3DProgramType.VERTEX, 
			0, modelViewProjection, true );

		// associate the vertex data with current shader program
		// position
		context3D.setVertexBufferAt(0, vertexBuffer, 0, 
			Context3DVertexBufferFormat.FLOAT_3);
		// tex coord
		context3D.setVertexBufferAt(1, vertexBuffer, 3, 
			Context3DVertexBufferFormat.FLOAT_2);
		// vertex rgba
		context3D.setVertexBufferAt(2, vertexBuffer, 8, 
			Context3DVertexBufferFormat.FLOAT_4);

		// finally draw the triangles
		context3D.drawTriangles(
			indexBuffer, 0, meshIndexData.length/3);
	}
	
	// present/flip back buffer
	// now that all meshes have been drawn
	context3D.present();
	
	// update the FPS display
	fpsTicks++;
	var now:uint = getTimer();
	var delta:uint = now - fpsLast;
	// only update the display once a second
	if (delta >= 1000) 
	{
		var fps:Number = fpsTicks / delta * 1000;
		fpsTf.text = fps.toFixed(1) + " fps";
		fpsTicks = 0;
		fpsLast = now;
	}
}

private function initData():void 
{
	// Defines which vertex is used for each polygon
	// In this example a square is made from two triangles
	meshIndexData = Vector.<uint> 
	([
		0, 1, 2, 		0, 2, 3,
	]);
	
	// Raw data used for each of the 4 verteces
	// Position XYZ, texture coord UV, normal XYZ, vertex RGBA
	meshVertexData = Vector.<Number> 
	( [
		//X,  Y,  Z,   U, V,   nX, nY, nZ,	R,	G,	B,	A
		 -1, -1,  1,   0, 0,   0,  0,  1,	1.0,0.0,0.0,1.0,
		  1, -1,  1,   1, 0,   0,  0,  1,	0.0,1.0,0.0,1.0,
		  1,  1,  1,   1, 1,   0,  0,  1,	0.0,0.0,1.0,1.0,
		 -1,  1,  1,   0, 1,   0,  0,  1,	1.0,1.0,1.0,1.0
	]);
}		

} // end of class
} // end of package
