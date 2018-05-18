import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Injectable } from '@angular/core';
import { FileOpener } from '@ionic-native/file-opener';

@Injectable()
export class AttachmentService {

    transfer: FileTransferObject;

    constructor(private fileTransfer: FileTransfer, private fileOpener: FileOpener) {
        this.transfer = this.fileTransfer.create();
    }

    downloadAttachment(attachmentServerUrl: string, destinationPath: string) {

        this.transfer.download(attachmentServerUrl, destinationPath).then(
            (success) => {
                console.log('download complete: ' + success);
                this.checkExtensionAndOpenFile(destinationPath);
            }, (error) => {
                console.log('download error: ' + error)
            });
    }

    checkExtensionAndOpenFile(destinationPath: string) {
        if (destinationPath.indexOf(".jpg") !== -1) {
            this.openFile(destinationPath, "image/jpg");
        } else if (destinationPath.indexOf(".jpeg") !== -1) {
            this.openFile(destinationPath, "image/jpeg");
        } else if (destinationPath.indexOf(".png") !== -1) {
            this.openFile(destinationPath, "image/png");
        } else if (destinationPath.indexOf(".pdf") !== -1) {
            this.openFile(destinationPath, "application/pdf");
        }
    }

    listenDownloadProgress(eventListener: (event: ProgressEvent) => any) {
        this.transfer.onProgress(eventListener);
    }

    openFile(resourcePath: string, applicationType: string) {
        this.fileOpener.open(resourcePath, applicationType)
            .then(() => console.log('File is opened'))
            .catch(e => console.log('Error opening file', e));
    }

}