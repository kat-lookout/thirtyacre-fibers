import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const projectsDirectory = join(process.cwd(), '_projects');

export function getProjectSlugs() {
    return fs.readdirSync(projectsDirectory)
}

export function getProjectBySlug(slug, fields = []) {
    const realSlug = slug.replace(/\.md$/, '')
    const fullPath = join(projectsDirectory, `${realSlug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    const items = {}
    
    // Ensure only the minimal needed data is exposed.
    fields.forEach((field) => {
        if (field === 'slug') {
            items[field] = realSlug
        }
        if (field === 'content') {
            items[field] = content
        }
        
        if (typeof data[field] !== 'undefined') {
            items[field] = data[field]
        }
    })
    
    return items
}

export function getAllProjects(fields = []) {
    const slugs = getProjectSlugs()
    const projects = slugs.map((slug) => getProjectBySlug(slug, fields))
                    // Sort by updateDate then startDate in descending order
                    .sort((a, b) => (
                        a.updateDate < b.updateDate ? 1 : 
                        a.updateDate > b.updateDate ? -1 :
                        a.startDate < b.startDate ? 1 :
                        a.startDate > b.startDate ? -1 : 0
                    ))
    return projects
}