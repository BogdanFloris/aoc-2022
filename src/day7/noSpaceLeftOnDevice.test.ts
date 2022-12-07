import { describe } from '@jest/globals';
import { Directory, DirectoryInfo } from './noSpaceLeftOnDevice';

describe('noSpaceLeftOnDevice', () => {
  const input = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k
`;

  it('totalSumFiltered should be 95437 for the example input', () => {
    const rootDirectory = Directory.fromInput(input);
    const directoryInfo: DirectoryInfo = {
      totalSumFiltered: 0,
      directorySizes: [],
    };
    rootDirectory.getDirectorySize(directoryInfo);
    expect(directoryInfo.totalSumFiltered).toBe(95437);
  });

  it("smallest directory's size that frees up enough space should be 24933642", () => {
    const rootDirectory = Directory.fromInput(input);
    const directoryInfo: DirectoryInfo = {
      totalSumFiltered: 0,
      directorySizes: [],
    };
    rootDirectory.getDirectorySize(directoryInfo);
    expect(
      rootDirectory.getSmallestDirectorySizeThatFreesUpEnoughSpace(
        directoryInfo,
      ),
    ).toBe(24933642);
  });
});
