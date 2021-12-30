////////////////////////////////////////////////////////////////////////////
//
// Copyright 2020 Realm Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
////////////////////////////////////////////////////////////////////////////

import { testContext } from "../testContext";

export function itUploadsDeletesAndDownloads(): void {
  it("uploads, cleans and downloads", async function () {
    if (!testContext.realm) {
      throw new Error("Expected a 'realm' on the mocha context");
    }
    // Ensure everything has been uploaded
    await testContext.realm.syncSession.uploadAllLocalChanges();
    // Close, delete and download the Realm from the server
    testContext.realm.close();
    // Delete the file
    Realm.deleteFile(testContext.config);
    // Re-open the Realm with the old configuration
    testContext.realm = new Realm(testContext.config);
    await testContext.realm.syncSession.downloadAllServerChanges();
  });
}
