# Hyfer back-end API end-points

## Modules

Note: all end-points for `modules` require the `teacher` role.

### Read

#### Request: `GET /api/modules`

**Response:** A JSON array of modules ordered by curriculum order. Each module is an object with the following properties:

| property | description |
| :------- | :---------- |
| `id: number` | The database `id` (primary key) of the module |
| `module_name: string` | The short descriptive name of the module |
| `description: string` | A longer description for the  module |
| `default_duration: number` | The default duration for the module in weeks |
| `seq_number: number | null` | A number used to establish an ordering of modules in the standard curriculum. If the value is `null` this module is not part of the standard curriculum (e.g. Holiday, Hackathon) but could be added ad-hoc to the list of running modules for a particular group. |
| `git_url: string` | The url to the git repository excluding the actual repository name |
| `git_owner: string` | The GitHub username of the repository owner. Usually this this `HackYourFuture` |
| `git_repo: string` | The repository name of the repository where the module materials (README etc) are maintained. |
| `color: string` | The background color for this module as a hex string (`#nnnnnn`) |
| `optional: number` | • `0` if this module is part of the standard curriculum<br>• `1` if this module is optional (e.g. _Holiday_, _Hackathon_) |
| `ref_count: number` | The number of references to this module from the list of running modules |

### Update

Update an existing module.

#### Request: `PATCH /api/modules`

**Body**

The complete list of modules obtained from a GET request, with any updates, additions and deletions should be passed in the request body, in the desired order. The backend will apply updates as required.

The backend will reject the request if any module for which `ref_count !== 0` is deleted from the list.

**Response**: As listed under `GET`, reflecting the updates.

## Users

### Read

#### `GET /api/user`

Gets the user details for the currently signed-in user.

**Response**: A JSON object with the following properties:

| property | description |
| :------- | :---------- |
| `username: string` | The GitHub username of the currently signed-in user |
| `role: string` | The role of the currently sign-in user |

#### `GET /api/users`

Gets a list of users. The requesting user must be signed-in as a GitHub user.

**Response**: A JSON array of objects with the following properties:

| property | description |
| :------- | :---------- |
| `username: string` | The GitHub username of the currently signed-in user |
| `role: string` | The role of the currently sign-in user |
| `register_date: string` | An ISO date string representing the date of the first sign-in to Hyfer |

####

## Groups

### Read

Get timeline data for a specified group (class).

#### Request: `GET /api/groups`

Returns a JSON object with timeline data, grouped by class name, as follows:

```
{
   "<group-name>": <running-module-list>,
   ...
   "<group-name>": <running-module-list>
}
```

where `<group-name>` is the name of a string representing the name of a group (class) and `<running-module-list>` is a JSON array with running module objects are described in the table below.

| property | description |
| :------- | :---------- |
| `id: number` | The `id` of the running module |
| `group_name: string` | The name of the running module |
| `starting_date: string` | The starting date for the running module as an ISO date string |
| `description: string` | The description of the running module |
| `duration: number` | The duration of the running module |
| `module_name: string` | The name of the running module |
| `git_url: string` | The url of the GitHub repository for the running module, excluding the repository name |
| `git_repo: string` | The repository name of the running module |

### Create

Add a new group (class): requires a `teacher` role.

#### Request: `POST /api/groups`

A JSON object with the following properties must be sent:

| property | description |
| :------- | :---------- |
| `group_name: string` | The name of the new group/class |
| `starting: string` | A date string representing the starting date for the group |

### Update

Updates an existing group/class: requires a teacher role.

### Request: `PATH /api/groups/:id`

where `id: number` is the id of an existing group to be updated.

The updates should be passed as a JSON object in the request body and can contain one or both properties listed for the POST request.

### Delete

Deletes an existing group/class: requires a teacher role.

### Request: `DELETE /api/groups/:id`

where `id: number` is the id of an existing group to be deleted.





## Running modules

Note: all end-points for `running_modules` require the `teacher` role.

### Read

#### Request: `GET /api/running/:groupId`

| param | description |
| :------ | :----------- |
| `groupId: number` | The `id` of the group for the running module list should be retrieved |

**Response:** A JSON array of running modules ordered by timeline sequence. Each running module is an object with the following properties:

| property | description |
| :------- | :---------- |
| `description: string` | The description of the runnning module |
| `duration" number` | The duration of the runnning module in weeks |
| `teacher1_id: number` | An `id` of a user with role `teacher` or `null`|
| `teacher1_id: number` | An `id` of a user with role `teacher` or `null`|

### Add

#### Request: `PATCH /api/running/:moduleId/:groupId/:position`

| param | description |
| :------ | :----------- |
| `moduleId: number` | The `id` of the module that should be added to the list of running modules |
| `groupId: number` | The `id` of the group for which the running modules should be updated |
| `position: number`  | The position where the new running module should be positioned. Specify -1 to add to the end of the list. |

**Body:** The request body is unused.

**Response:** A JSON object with the updated running modules list. For detail, see the GET request.

### Update

#### Request: `PATCH /api/running/:groupId/:position`

| param | description |
| :------ | :----------- |
| `groupId: number` | The `id` of the group for which the running modules should be updated |
| `position: number`  | The position of the running module to be updated. |

**Body (JSON):**

Note: all properties are optional but at least one must be specified.

| property | description |
| :------- | :---------- |
| `position: number` | An updated position for the running module. Specify -1 to place at the end of the list. |
| `description: string` | An updated description |
| `duration: number` | A number indicating an updated duration in weeks |
| `teacher1_id: number` | The `id` of an existing user with role `teacher` |
| `teacher2_id: number` | The `id` of an existing user with role `teacher` |

**Response:** A JSON object with the updated running modules list.

### Delete

#### Request: `DELETE /api/running/:groupId/:position`

| param | description |
| :------ | :----------- |
| `groupId: number` | The `id` of the group for which a running module should be deleted |
| `position: number`  | The position of the running module to be deleted |

**Response:** A JSON object with the updated running modules list.

