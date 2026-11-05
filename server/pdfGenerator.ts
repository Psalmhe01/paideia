import fs from 'node:fs';
import path from 'node:path';
import PDFDocument from 'pdfkit';
import type { SeedAttachmentSpec } from './types.js';

export interface GeneratedAttachmentFile {
  fileName: string;
  storedPath: string;
  mimeType: string;
  fileSize: number;
  previewText: string;
}

export async function generateSeedAttachmentFile(
  spec: SeedAttachmentSpec,
  topicTitle: string,
  disciplineName: string,
  linkedSourceTitle: string | null,
  seedFilesDir: string
): Promise<GeneratedAttachmentFile> {
  const previewLines: string[] = [
    `# ${spec.documentTitle}`,
    `*${spec.documentSubtitle}*`,
    '',
    `- **Discipline**: ${disciplineName}`,
    `- **Study Topic**: ${topicTitle}`,
    ...(linkedSourceTitle ? [`- **Companion to Online Source**: ${linkedSourceTitle}`] : []),
    '',
    '---',
    '',
  ];

  for (const sec of spec.sections) {
    previewLines.push(`## ${sec.heading}`);
    previewLines.push(sec.content);
    previewLines.push('');
  }

  const previewText = previewLines.join('\n');

  if (spec.format === 'markdown') {
    const fileName = `${spec.key}.md`;
    const storedPath = path.join(seedFilesDir, fileName);
    fs.writeFileSync(storedPath, previewText, 'utf8');
    const stats = fs.statSync(storedPath);
    return {
      fileName,
      storedPath,
      mimeType: 'text/markdown; charset=utf-8',
      fileSize: stats.size,
      previewText,
    };
  }

  // Generate a well-formatted scholarly PDF using PDFKit
  const fileName = `${spec.key}.pdf`;
  const storedPath = path.join(seedFilesDir, fileName);

  await new Promise<void>((resolve, reject) => {
    const doc = new PDFDocument({
      size: 'LETTER',
      margins: { top: 56, bottom: 56, left: 60, right: 60 },
      info: {
        Title: spec.documentTitle,
        Author: 'Paideia Theological Library',
        Subject: `${disciplineName} — ${topicTitle}`,
      },
    });

    const stream = fs.createWriteStream(storedPath);
    stream.on('finish', () => resolve());
    stream.on('error', (err) => reject(err));
    doc.pipe(stream);

    // Header banner
    doc
      .font('Times-Italic')
      .fontSize(10)
      .fillColor('#78350f')
      .text('PAIDEIA THEOLOGICAL LIBRARY  •  PRIMARY SOURCE & STUDY ARCHIVE', {
        align: 'center',
      });

    doc.moveDown(0.5);
    doc
      .font('Times-Bold')
      .fontSize(20)
      .fillColor('#1c1917')
      .text(spec.documentTitle, { align: 'center' });

    doc.moveDown(0.25);
    doc
      .font('Times-Italic')
      .fontSize(12)
      .fillColor('#57534e')
      .text(spec.documentSubtitle, { align: 'center' });

    doc.moveDown(0.8);
    doc
      .moveTo(60, doc.y)
      .lineTo(552, doc.y)
      .strokeColor('#d6d3d1')
      .lineWidth(1)
      .stroke();
    doc.moveDown(0.8);

    // Metadata box
    doc
      .font('Helvetica-Bold')
      .fontSize(9)
      .fillColor('#44403c')
      .text(`DISCIPLINE: ${disciplineName.toUpperCase()}    |    TOPIC: ${topicTitle}`);

    if (linkedSourceTitle) {
      doc.moveDown(0.2);
      doc
        .font('Helvetica')
        .fontSize(9)
        .fillColor('#78350f')
        .text(`ATTACHED TO ONLINE SOURCE: ${linkedSourceTitle}`);
    }

    doc.moveDown(1.1);

    for (const sec of spec.sections) {
      doc
        .font('Times-Bold')
        .fontSize(14)
        .fillColor('#78350f')
        .text(sec.heading);

      doc.moveDown(0.35);

      doc
        .font('Times-Roman')
        .fontSize(11.5)
        .fillColor('#1c1917')
        .text(sec.content, {
          lineGap: 3.5,
          align: 'left',
        });

      doc.moveDown(1);
    }

    doc.moveDown(1);
    doc
      .moveTo(60, doc.y)
      .lineTo(552, doc.y)
      .strokeColor('#e7e5e4')
      .lineWidth(0.75)
      .stroke();
    doc.moveDown(0.5);
    doc
      .font('Times-Italic')
      .fontSize(9.5)
      .fillColor('#78716c')
      .text(
        'Prepared for catechetical study and historical examination within Paideia (Eph 6:4; 2 Tim 2:15).',
        { align: 'center' }
      );

    doc.end();
  });

  const stats = fs.statSync(storedPath);
  return {
    fileName,
    storedPath,
    mimeType: 'application/pdf',
    fileSize: stats.size,
    previewText,
  };
}
