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

import { Client as MochaRemoteClient } from "mocha-remote-client";
import * as Realm from "realm-web";

if (location.pathname.endsWith("-callback")) {
  console.log("This is the callback from Google OAuth 2.0 flow");
  Realm.handleAuthRedirect();
} else if (location.pathname.endsWith("/google-login")) {
  console.log("Hello to Google Login ...");
  await import("./google-login");
} else {
  new MochaRemoteClient({
    async tests() {
      beforeEach(function () {
        this.slow(1000);
        this.timeout(10000);
      });

      await import("./environment.test");
      await import("./app.test");
      await import("./credentials.test");
      await import("./user.test");
      await import("./functions.test");
      await import("./services.test");
      await import("./api-key-auth.test");
      await import("./email-password-auth.test");
      await import("./iife.test");
      await import("./bson.test");
    },
  });
}
