# Hyfer back-end API end-points

## Running modules

### Read

#### Request: `GET /api/running/:groupId`

| param | description |
| :------ | :----------- |
| `groupId` | The `id` of the group for the running module list should be retrieved |

**Response:** A JSON object with the current running modules list.

### Add

#### Request: `PATCH /api/running/:moduleId/:groupId/:position`

| param | description |
| :------ | :----------- |
| `moduleId` | The `id` of the module that should be added to the list of running modules |
| `groupId` | The `id` of the group for which the running modules should be updated |
| `position`  | The position where the new running module should be positioned. Specify -1 to add to the end of the list. |

**Body:** The request body is unused. 

**Response:** A JSON object with the updated running modules list.

### Update

#### Request: `PATCH /api/running/:groupId/:position`

| param | description |
| :------ | :----------- |
| `groupId` | The `id` of the group for which the running modules should be updated |
| `position`  | The position of the running module to be updated. |

**Body (JSON):**

Note: all properties are optional but at least one must be specified.

| property | description |
| :------- | :---------- |
| `position` | An updated position for the running module. Specify -1 to place at the end of the list. |
| `description` | An updated description |
| `duration` | A number indicating an updated duration in weeks |
| `teacher1_id` | The `id` of an existing user with role `teacher` |
| `teacher2_id` | The `id` of an existing user with role `teacher` |

**Response:** A JSON object with the updated running modules list.

### Delete

#### Request: `DELETE /api/running/:groupId/:position`

| param | description |
| :------ | :----------- |
| `groupId` | The `id` of the group for which a running module should be deleted |
| `position`  | The position of the running module to be deleted |

**Response:** A JSON object with the updated running modules list.

