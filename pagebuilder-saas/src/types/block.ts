/* src/types/block.ts - ACTUALIZADO CON CHAT */

export type BlockType = 
  | 'hero' | 'banner' | 'text' | 'two-col' | 'three-card' 
  | 'product' | 'gallery' | 'contact' | 'image' | 'video' | 'chat';

export interface BlockStyle {
  padding: number;
  borderRadius: number;
  backgroundColor: string;
  borderWidth: number;
  borderColor: string;
  textColor: string;
  textAlign: 'left' | 'center' | 'right';
}

export interface Block {
  id: string;
  type: BlockType;
  content: Record<string, any>;
  style: BlockStyle;
}

export interface Section {
  id: string;
  blocks: Block[];
}